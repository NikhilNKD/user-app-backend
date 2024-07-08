// routes/v1/customerRoutes.js
import { Router } from 'express';
import { updatePincodeController } from '../../controllers/customerController.js';

const router = Router();

router.put('/updatePincode', updatePincodeController);

export default router;
