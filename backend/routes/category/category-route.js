const express = require('express');
const {
  createCategoryController,
  fetchAllCategoryController,
} = require('../../controllers/category/category-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

const categoryRoute = express.Router();

categoryRoute.post('/api/category', authMiddleware, createCategoryController);
categoryRoute.get('/api/category', authMiddleware, fetchAllCategoryController);

module.exports = categoryRoute;
