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
    const post = await Post.findById(id)
      .populate('author')
      .populate('disLikes')
      .populate('likes');
    console.log(post);
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
        user: req.user._id,
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.json('error updating post');
  }
});

// delete post
const deletePostController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (err) {
    res.json('error deleting post');
  }
});

// likes
const likePostController = expressAsyncHandler(async (req, res) => {
  // find the post to be liked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //  find the login user
  const loginUserId = req.user._id;
  // find if this user has liked this post
  const isLiked = post.isLiked;
  // check if this user has disliked this post
  const alreadyDisliked = post.dislikes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  // remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  // remove user if liked
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    // add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: loginUserId,
        },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});

// dislikes
const dislikePostController = expressAsyncHandler(async (req, res) => {
  // find the post to be disliked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  // find the login user
  const loginUserId = req.user._id;
  // check if this user has disliked this post
  const isDisLiked = post.isDisLiked;
  // check if this user has liked this post
  const alreadyLiked = post.likes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  // remove this user from likes array if exists
  if (alreadyLiked) {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  // toggling
  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          disLikes: loginUserId,
        },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    // add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          disLikes: loginUserId,
        },
        isDisLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});

module.exports = {
  createPostController,
  fetchAllPostsController,
  fetchSinglePostController,
  updatePostController,
  deletePostController,
  likePostController,
  dislikePostController,
};
