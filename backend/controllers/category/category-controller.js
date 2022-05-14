const expressAsyncHandler = require('express-async-handler');
const Category = require('../../models/Category/category-model');

// create
const createCategoryController = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (err) {
    res.json('error creating category');
  }
});

module.exports = { createCategoryController };
