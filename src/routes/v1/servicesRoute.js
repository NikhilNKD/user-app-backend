import { Router } from 'express';
import { getServicesBySubcategory } from '../../controllers/servicesController.js';

const router = Router();

router.get('/subcategory/:subcategory', getServicesBySubcategory);

export default router;
