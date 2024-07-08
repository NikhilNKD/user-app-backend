import { Router } from 'express';
import { getMainServicesBySubcategory } from '../../controllers/mainServicesController.js';

const router = Router();

router.get('/:subcategory', getMainServicesBySubcategory);

export default router;
