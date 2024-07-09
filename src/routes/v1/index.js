import { Router } from 'express';
import authRoutes from './authRoutes.js';
import otpRoutes from './otpRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/otp',otpRoutes);

export default router;
