import { Router } from 'express';
import authRoutes from './authRoutes.js';
import otpRoutes from './otpRoutes.js';
import categoryRoutes from "./categoryRoutes.js"
import productInventoryRoutes from './ProductInventoryRoutes.js';
import customerRoutes from './customerRoutes.js';
import shopkeeperDetailsRoutes from './shopkeeperDetailsRoutes.js';  // Import the shopkeeperDetailsRoutes
import pincodeRoutes from "./pincodeRoutes.js"
const router = Router();

router.use('/auth', authRoutes);
router.use('/otp',otpRoutes);
router.use('/category', categoryRoutes);
router.use('/productInventory', productInventoryRoutes);
router.use('/customer', customerRoutes);
router.use('/shopkeeper', shopkeeperDetailsRoutes);
router.use('/pincode', pincodeRoutes); // Use the pincode routes
export default router;
