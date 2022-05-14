const express = require('express');
const {
  createCommentController,
  fetchAllCommentsController,
  fetchSingleCommentController,
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

module.exports = commentRoute;
