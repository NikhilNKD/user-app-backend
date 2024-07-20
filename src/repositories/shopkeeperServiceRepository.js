// src/repositories/mainServiceRepository.js
import { AppDataSource } from '../config/data-source.js';
import { TblSalonMainServices  } from '../entities/TblSalonMainServices.js';
import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js';

export const getMainServicesBySubCategoryRepository = async (subCategory) => {
    const repository = AppDataSource.getRepository(TblSalonMainServices);
    return await repository
        .createQueryBuilder('mainService')
        .leftJoinAndSelect('mainService.subCategory', 'subCategory')
        .where('subCategory.sub_category = :subCategory', { subCategory }) // Use 'sub_category' here
        .getMany();
};


 


export const getSubServicesByMainServiceId = async (mainServiceId) => {
  const repository = AppDataSource.getRepository(TblSalonSubSubServices);
  return await repository
    .createQueryBuilder('subSubService')
    .where('subSubService.mainServiceId = :mainServiceId', { mainServiceId })
    .getMany();
};
