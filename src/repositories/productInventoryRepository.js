import { AppDataSource } from '../config/data-source.js';
import { TblProductMaster } from '../entities/TblProductMaster.js';
import { ShopkeeperProducts } from '../entities/ShopkeeperProducts.js';

// Fetch products by type (selectedCategory)
export const getProductsByCategory = async (category) => {
    try {
        const productRepository = AppDataSource.getRepository(TblProductMaster);
        const products = await productRepository.find({
            where: {
                type: category // Match the type
            }
        });
        return products;
    } catch (error) {
        throw new Error('Error fetching products by category: ' + error.message);
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeper = async (shopkeeperPhoneNumber, productId) => {
    try {
        const shopkeeperProductRepository = AppDataSource.getRepository(ShopkeeperProducts);
        const newEntry = shopkeeperProductRepository.create({ phoneNumber: shopkeeperPhoneNumber, productId });
        await shopkeeperProductRepository.save(newEntry);
    } catch (error) {
        throw new Error('Error adding product to shopkeeper\'s list: ' + error.message);
    }
};
