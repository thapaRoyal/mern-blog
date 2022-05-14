const expressAsyncHandler = require('express-async-handler');
const Category = require('../../models/Category/category-model');
const validateMongoId = require('../../utils/validateMongoId');

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

// fetch all category
const fetchAllCategoryController = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate('user')
      .sort('-createdAt');
    res.json(categories);
  } catch (err) {
    res.json('error fetching categories');
  }
});

// fetch single category
const fetchSingleCategoryController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const category = await Category.findById(id)
      .populate('user')
      .sort('-createdAt');
    res.json(category);
  } catch (err) {
    res.json('error fetching categories');
  }
});

// update category
const updateCategoryController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const update = await Category.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
      },
      { new: true, runValidators: true }
    );
    res.json(update);
  } catch (err) {
    res.json('error updating category');
  }
});

//delete category
const deleteCategoryController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (err) {
    res.json('error deleting category');
  }
});

module.exports = {
  createCategoryController,
  fetchAllCategoryController,
  fetchSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
