const {
  createPostController,
} = require('../../controllers/posts/postController');
const postRoute = require('express').Router();

postRoute.post('/api/posts', createPostController);

module.exports = postRoute;
