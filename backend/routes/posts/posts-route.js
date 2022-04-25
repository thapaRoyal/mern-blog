const {
  createPostController,
  fetchAllPostsController,
  fetchSinglePostController,
  updatePostController,
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
postRoute.get('/api/post/:id', fetchSinglePostController);
postRoute.put('/api/post/:id', authMiddleware, updatePostController);

module.exports = postRoute;
