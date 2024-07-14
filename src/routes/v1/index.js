import { Router } from 'express';
import authRoutes from './authRoutes.js';
import otpRoutes from './otpRoutes.js';
import categoryRoutes from "./categoryRoutes.js"
import productInventoryRoutes from './ProductInventoryRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/otp',otpRoutes);
router.use('/category', categoryRoutes);
router.use('/productInventory', productInventoryRoutes);

export default router;
