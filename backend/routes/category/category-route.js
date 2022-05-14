const express = require('express');
const {
  createCategoryController,
} = require('../../controllers/category/category-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

const categoryRoute = express.Router();

categoryRoute.post('/api/category', authMiddleware, createCategoryController);

module.exports = categoryRoute;
