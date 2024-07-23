// src/routes/v1/salesExecutiveRoutes.js

import { Router } from 'express';
import { checkUserController ,submitFormController } from '../../controllers/salesExecutiveController.js';

const router = Router();

router.post('/check-user', checkUserController);  // Route to check if user exists
router.post('/submit-form', submitFormController); // Route to submit the form

export default router;
