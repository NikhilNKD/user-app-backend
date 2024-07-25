// src/routes/v1/salesExecutiveRoutes.js

import { Router } from 'express';
import { checkUserController ,registerSalesController,submitFormController } from '../../controllers/salesExecutiveController.js';

const router = Router();

router.post('/check-user', checkUserController);  // Route to check if user exists
router.post('/submit-form', submitFormController); // Route to submit the form
router.post('/registerSales', registerSalesController); // Route to submit the form
//Register Shopkeeper from sales executive module 


export default router;
