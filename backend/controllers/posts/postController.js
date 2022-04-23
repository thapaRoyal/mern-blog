const expressAsyncHandler = require('express-async-handler');
const Post = require('../../models/post/Post-model');
const validateMongoId = require('../../utils/validateMongoId');

const createPostController = expressAsyncHandler(async (req, res) => {
  //   validateMongoId(req.body.user);
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

module.exports = { createPostController };
