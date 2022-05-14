const expressAsyncHandler = require('express-async-handler');
const Comment = require('../../models/comment/Comment-model');

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

module.exports = { createCommentController };
