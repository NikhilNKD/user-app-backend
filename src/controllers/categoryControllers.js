// controllers/categoryController.js
import { getCategories } from '../services/categoryService.js';

export const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
