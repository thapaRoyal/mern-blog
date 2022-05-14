const express = require('express');
const {
  createCommentController,
} = require('../../controllers/comments/comments-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

const commentRouter = express.Router();

commentRouter.post('/api/comments', authMiddleware, createCommentController);

module.exports = commentRouter;
