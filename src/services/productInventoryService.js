// src/services/productInventoryService.js
import { getProductsByCategory as getProductsByCategoryRepo, addProductToShopkeeper as addProductToShopkeeperRepo } from '../repositories/productInventoryRepository.js';

// Get products by category
export const getProductsByCategory = async (category) => {
    try {
        return await getProductsByCategoryRepo(category);
    } catch (error) {
        throw new Error('Service error fetching products by category: ' + error.message);
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeper = async (shopkeeperPhoneNumber, productId) => {
    try {
        return await addProductToShopkeeperRepo(shopkeeperPhoneNumber, productId);
    } catch (error) {
        throw new Error('Service error adding product to shopkeeper\'s list: ' + error.message);
    }
};
