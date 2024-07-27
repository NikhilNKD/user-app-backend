// src/controllers/productInventoryController.js
import { getProductsByCategory, addProductToShopkeeper } from '../services/productInventoryService.js';

// Fetch products by category
export const getProductsByCategoryController = async (req, res) => {
    try {
        const { category } = req.params;
        console.log('Selected Category:', category); // Debugging statement
        const products = await getProductsByCategory(category);
        console.log('Fetched Products:', products); // Debugging statement
        res.status(200).json({
            success: true,
            data: products,
            message: 'Products fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeperController = async (req, res) => {
    try {
        const { shopkeeperPhoneNumber, productId } = req.body;
        await addProductToShopkeeper(shopkeeperPhoneNumber, productId);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Product added to shopkeeper\'s list successfully'
        });
    } catch (error) {
        console.error('Error adding product to shopkeeper:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error adding product to shopkeeper\'s list',
            error: error.message
        });
    }
};
