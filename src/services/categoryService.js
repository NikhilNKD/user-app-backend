// services/categoryService.js
import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';

const categoryRepository = AppDataSource.getRepository(Category);

export const getCategories = async () => {
  try {
    return await categoryRepository.find();
  } catch (error) {
    throw new Error('Error fetching categories: ' + error.message);
  }
};
