const express = require('express');
const {
  createCategoryController,
  fetchAllCategoryController,
  fetchSingleCategoryController,
  updateCategoryController,
} = require('../../controllers/category/category-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

const categoryRoute = express.Router();

categoryRoute.post('/api/category', authMiddleware, createCategoryController);
categoryRoute.get('/api/category', authMiddleware, fetchAllCategoryController);
categoryRoute.get(
  '/api/category/:id',
  authMiddleware,
  fetchSingleCategoryController
);
categoryRoute.put(
  '/api/category/:id',
  authMiddleware,
  updateCategoryController
);

module.exports = categoryRoute;
