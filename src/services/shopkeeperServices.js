// src/services/mainServiceService.js
import { getMainServicesBySubCategoryRepository ,getSubServicesByMainServiceId} from '../repositories/shopkeeperServiceRepository.js';
 


export const getMainServicesBySubCategoryService = async (subCategory) => {
    try {
        const services = await getMainServicesBySubCategoryRepository(subCategory);
        return services;
    } catch (error) {
        throw new Error('Error fetching main services: ' + error.message);
    }
};




export const getSubServicesByMainServiceIdService = async (mainServiceId) => {
    try {
      const subServices = await getSubServicesByMainServiceId(mainServiceId);
      return subServices;
    } catch (error) {
      throw new Error('Error fetching sub-services: ' + error.message);
    }
  };
