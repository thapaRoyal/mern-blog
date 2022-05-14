const express = require('express');
const {
  createCommentController,
  fetchAllCommentsController,
  fetchSingleCommentController,
  updateCommentController,
} = require('../../controllers/comments/comments-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

const commentRoute = express.Router();

commentRoute.post('/api/comments', authMiddleware, createCommentController);
commentRoute.get('/api/comments', authMiddleware, fetchAllCommentsController);
commentRoute.get(
  '/api/comments/:id',
  authMiddleware,
  fetchSingleCommentController
);
commentRoute.put('/api/comments/:id', authMiddleware, updateCommentController);

module.exports = commentRoute;
