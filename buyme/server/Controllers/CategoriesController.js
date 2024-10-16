// this is the controller for the categories API endpoint
import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModel.js";

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all categories in the database
    const categories = await Categories.find({});
    // send the categories to the client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Create new category
// @route POST /api/categories
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  try {
    // get category title from the request body
    const { title } = req.body;
    // create new category
    const category = new Categories({
      title: title,
    });
    // save the category in the database
    const createdCategory = await category.save();
    // send the category to the client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from the request params
    const category = await Categories.findById(req.params.id);
    // if the category found update it
    if (category) {
      category.title = req.body.title || category.title;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // find the category by id
    const category = await Categories.findById(req.params.id);
    // if the category found delete it
    if (category) {
      await category.remove();
      res.status(200).json({ message: "Category removed" });
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
