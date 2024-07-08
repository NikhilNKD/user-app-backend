// services/subCategoryService.js
import { AppDataSource } from '../config/data-source.js';
import { SubCategory } from '../entities/SubCategory.js';

const subCategoryRepository = AppDataSource.getRepository(SubCategory);

export const getSubCategoriesByCategoryId = async (categoryId) => {
  try {
    return await subCategoryRepository.find({ where: { category_id: categoryId } });
  } catch (error) {
    throw new Error('Error fetching sub-categories: ' + error.message);
  }
};
