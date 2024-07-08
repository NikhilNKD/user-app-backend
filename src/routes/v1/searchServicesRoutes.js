import { Router } from 'express';
import { searchServices } from '../../controllers/searchServicesController.js';

const router = Router();

router.get('/', searchServices);

export default router;
