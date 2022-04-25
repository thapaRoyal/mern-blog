const expressAsyncHandler = require('express-async-handler');
const Post = require('../../models/post/Post-model');
const fs = require('fs');
const validateMongoId = require('../../utils/validateMongoId');
const Filter = require('bad-words');
const User = require('../../models/user/User-model');
const coudinaryUploadImage = require('../../utils/cloudinary');

// create post
const createPostController = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //   validateMongoId(req.body.user);
  //   check for bad words

  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //   block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      'You have been blocked because post contains profane words'
    );
  }

  // 1. get the path to the image
  const localPath = `public/images/posts/${req.file.filename}`;
  // 2. upload to cloudinary
  const imageUploaded = await coudinaryUploadImage(localPath);

  try {
    // const post = await Post.create({
    //   ...req.body,
    //   image: imageUploaded.url,
    //   user: _id,
    // });
    res.json(imageUploaded);
    // remove the image from the server
    fs.unlinkSync(localPath);
  } catch (err) {
    res.json(err);
  }
});

// fetch all posts
const fetchAllPostsController = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author');
    res.json(posts);
  } catch (err) {
    res.json('error fetching posts');
  }
});

// fetch single post
const fetchSinglePostController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const post = await Post.findById(id).populate('author');
    // update number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numberOfViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.json('error fetching post');
  }
});

// update post
const updatePostController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.json('error updating post');
  }
});

module.exports = {
  createPostController,
  fetchAllPostsController,
  fetchSinglePostController,
  updatePostController,
};
