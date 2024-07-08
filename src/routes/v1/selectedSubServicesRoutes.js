import { Router } from 'express';
import { addSelectedSubServices } from '../../controllers/selectedSubServicesController.js';

const router = Router();

router.post('/', addSelectedSubServices);

export default router;
