// src/routes/v1/mainServiceRoutes.js
import { Router } from 'express';
import {getMainServicesBySubCategory,getSubServicesByMainServiceId} from '../../controllers/shopkeeperServicesController.js';
 


const router = Router();

router.get('/mainServices/:selectedSubCategory', getMainServicesBySubCategory);
router.get('/subServices/:mainServiceId', getSubServicesByMainServiceId);

export default router;
