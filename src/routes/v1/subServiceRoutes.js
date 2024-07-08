import { Router } from 'express';
import { getSubServicesByMainServiceId } from '../../controllers/subServicesController.js';

const router = Router();

router.get('/mainservice/:mainServiceId', getSubServicesByMainServiceId);

export default router;
