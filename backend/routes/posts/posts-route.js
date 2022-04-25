const {
  createPostController,
  fetchAllPostsController,
} = require('../../controllers/posts/postController');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const {
  photoUpload,
  postImageResize,
} = require('../../middleware/uploads/photoUpload');
const postRoute = require('express').Router();

postRoute.post(
  '/api/posts',
  authMiddleware,
  photoUpload,
  postImageResize,
  createPostController
);

postRoute.get('/api/posts', fetchAllPostsController);

module.exports = postRoute;
