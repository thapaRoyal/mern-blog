const expressAsyncHandler = require('express-async-handler');
const Comment = require('../../models/comment/Comment-model');

// create
const createCommentController = expressAsyncHandler(async (req, res) => {
  // get the user
  const user = req.user;
  // get the post id
  const { postId, description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
  }
});

// fetch all comments
const fetchAllCommentsController = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort('-createdAt');
    res.json(comments);
  } catch (err) {
    console.log(err);
  }
});

// fetch single comment
const fetchSingleCommentController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  createCommentController,
  fetchAllCommentsController,
  fetchSingleCommentController,
};
