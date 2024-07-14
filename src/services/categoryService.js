// src/services/categoryService.js
import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

export const getAllCategories = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.find();
};

export const getSubCategoriesByCategoryId = async (categoryId) => {
  const subCategoryRepo = AppDataSource.getRepository(TblSalonSubcategory);
  return await subCategoryRepo.find({ where: { categoryId } });
};

export const createCategoriesService = async (data) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const newCategory = categoryRepo.create(data);
  return await categoryRepo.save(newCategory);
};

export const createSubCategoryService = async (data) => {
  const subCategoryRepo = AppDataSource.getRepository(TblSalonSubcategory);
  const newSubCategory = subCategoryRepo.create(data);
  return await subCategoryRepo.save(newSubCategory);
};
export const getCategoryByName = async (name) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.findOne({ where: { name } });
};