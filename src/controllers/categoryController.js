import { createCategoriesService, getAllCategories, getSubCategoriesByCategoryId, createSubCategoryService, getCategoryByName } from '../services/categoryService.js';
import { NotFoundError } from '../utils/errorHandlers.js';

export const fetchCategoryByName = async (req, res) => {
  const { name } = req.query;

  if (!name) throw new NotFoundError("Category name is required");

  try {
    const category = await getCategoryByName(name);
    if (category) {
      res.status(200).json({
        success: true,
        data: category,
        message: 'Category fetched successfully',
      });
    } else {
      throw new NotFoundError("Category not found");
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while fetching category',
      error: error.message
    });
  }
};

export const createCategories = async (req, res) => {
  try {
    const categories = req.body;  // Expecting an array of category objects
    await createCategoriesService(categories);
    res.status(201).json({
      success: true,
      data: null,
      message: 'Categories added successfully'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while creating category',
      error: error.message
    });
  }
};

export const fetchCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      success: true,
      data: categories,
      message: 'Categories fetched successfully'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while fetching category',
      error: error.message
    });
  }
};

export const fetchSubCategories = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const subCategories = await getSubCategoriesByCategoryId(parseInt(categoryId, 10));  // Parse categoryId to an integer
    res.status(200).json({
      success: true,
      data: subCategories,
      message: 'Sub-categories fetched successfully'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while fetching sub category',
      error: error.message
    });
  }
};

export const createSubCategories = async (req, res) => {
  try {
    const subCategories = req.body;  // Expecting an array of subcategory objects
    await createSubCategoryService(subCategories);
    res.status(201).json({
      success: true,
      data: null,
      message: 'Sub-categories added successfully'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while creating sub category',
      error: error.message
    });
  }
};
