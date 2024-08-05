import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

export const getAllCategories = async () => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    return await categoryRepo.find();
  } catch (error) {
    throw new InternalServerError("Errow in categoryRepo Repository");
  }
};

export const getSubCategoriesByCategoryId = async (categoryId) => {
  try {
    const subCategoryRepo = AppDataSource.getRepository(TblSalonSubcategory);
    return await subCategoryRepo.find({ where: { category_id: categoryId } });
  } catch (error) {
    throw new InternalServerError("Errow in getSubCategoriesByCategoryId Repository");
  }
};

export const createCategoriesService = async (data) => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    return await categoryRepo.save(data);
  } catch (error) {
    throw new InternalServerError("Errow in createCategoriesService Repository");
  }
};

export const createSubCategoryService = async (data) => {
  try {
    const subCategoryRepo = AppDataSource.getRepository(TblSalonSubcategory);
    return await subCategoryRepo.save(data);
  } catch (error) {
    throw new InternalServerError("Errow in createSubCategory Repository");
  }
};

export const getCategoryByName = async (name) => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    return await categoryRepo.findOne({ where: { name } });
  } catch (error) {
    throw new InternalServerError("Errow in getCategoryByName Repository");
  }
};
