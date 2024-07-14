// src/routes/v1/ProductInventoryRoutes.js
import { Router } from 'express';
import { getProductsByCategoryController, addProductToShopkeeperController } from '../../controllers/productInventoryController.js';

const router = Router();

// Route to get products by category
router.get('/products/:category', getProductsByCategoryController);

// Route to add a product to a shopkeeper's list
router.post('/addProduct', addProductToShopkeeperController);

export default router;
