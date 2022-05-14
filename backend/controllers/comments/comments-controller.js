const expressAsyncHandler = require('express-async-handler');
const Comment = require('../../models/comment/Comment-model');
const validateMongoId = require('../../utils/validateMongoId');

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

// update comment
const updateCommentController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        post: req.body.postId,
        user: req.user,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(comment);
  } catch (err) {
    console.log(err);
  }
});

// delete comment
const deleteCommentController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  createCommentController,
  fetchAllCommentsController,
  fetchSingleCommentController,
  updateCommentController,
  deleteCommentController,
};
