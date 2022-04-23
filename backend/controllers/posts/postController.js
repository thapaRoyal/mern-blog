const expressAsyncHandler = require('express-async-handler');
const Post = require('../../models/post/Post-model');

const createPostController = expressAsyncHandler(async (req, res, next) => {
  res.json('post controller');
});

module.exports = { createPostController };
