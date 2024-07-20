// src/routes/v1/mainServiceRoutes.js
import { Router } from 'express';
import {getMainServicesBySubCategory} from '../../controllers/shopkeeperServicesController.js';


const router = Router();

router.get('/mainServices/:selectedSubCategory', getMainServicesBySubCategory);

export default router;
