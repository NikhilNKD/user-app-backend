// src/repositories/mainServiceRepository.js
import { AppDataSource } from '../config/data-source.js';
import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';

export const getMainServicesBySubCategoryRepository = async (subCategory) => {
    const repository = AppDataSource.getRepository(TblSalonMainServices);
    return await repository
        .createQueryBuilder('mainService')
        .leftJoinAndSelect('mainService.subCategory', 'subCategory')
        .where('subCategory.subCategory = :subCategory', { subCategory })
        .getMany();
};
