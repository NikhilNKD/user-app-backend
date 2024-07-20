// src/services/mainServiceService.js
import { getMainServicesBySubCategoryRepository } from '../repositories/shopkeeperServiceRepository';

export const getMainServicesBySubCategoryService = async (subCategory) => {
    try {
        const services = await getMainServicesBySubCategoryRepository(subCategory);
        return services;
    } catch (error) {
        throw new Error('Error fetching main services: ' + error.message);
    }
};
