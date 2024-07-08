// controllers/subCategoryController.js
import { getSubCategoriesByCategoryId } from '../services/subCategoryService.js';

export const getSubCategoriesByCategoryIdController = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const subCategories = await getSubCategoriesByCategoryId(categoryId);
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
