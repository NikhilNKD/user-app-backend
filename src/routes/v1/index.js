import { Router } from 'express';
import authRoutes from './authRoutes.js';
import otpRoutes from './otpRoutes.js';
import paymentRoutes from './paymentRoutes.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/otp',otpRoutes);
router.use('/payment',paymentRoutes);

export default router;
