const expressAsyncHandler = require('express-async-handler');
const Post = require('../../models/post/Post-model');
const validateMongoId = require('../../utils/validateMongoId');
const Filter = require('bad-words');
const User = require('../../models/user/User-model');
const coudinaryUploadImage = require('../../utils/cloudinary');

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
    const post = await Post.create({
      ...req.body,
      image: imageUploaded.url,
      user: _id,
    });
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

module.exports = { createPostController };
