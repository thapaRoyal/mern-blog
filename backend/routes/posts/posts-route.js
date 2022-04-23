const {
  createPostController,
} = require('../../controllers/posts/postController');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const postRoute = require('express').Router();

postRoute.post('/api/posts', authMiddleware, createPostController);

module.exports = postRoute;
