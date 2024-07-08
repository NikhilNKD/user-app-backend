// routes/v1/shopkeeperRoutes.js
import { Router } from 'express';
import { getShopkeeperDetailsController } from '../../controllers/shopkeeperController.js';

const router = Router();

router.get('/shopkeeperDetails/:phoneNumber', getShopkeeperDetailsController);

export default router;
