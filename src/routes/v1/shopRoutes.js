// routes/v1/shopRoutes.js
import { Router } from 'express';
import { getShopsByPincodeController } from '../../controllers/shopController.js';

const router = Router();

router.get('/shopsInPincode/:pincode', getShopsByPincodeController);

export default router;
