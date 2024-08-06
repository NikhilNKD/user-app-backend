// src/routes/v1/mainServiceRoutes.js
import { Router } from 'express';
import {getMainServicesBySubCategory,getSubServicesByMainServiceId,saveSelectedServicesController,getSelectedMainServices,getSelectedSubServicesController, registerServiceController   } from '../../controllers/shopkeeperServicesController.js';
import { uploadS3 } from '../../utils/helper.js';
 


const router = Router();

router.post('/register-service-provider', uploadS3.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]), registerServiceController);


router.get('/mainServices/:selectedSubCategory', getMainServicesBySubCategory);
router.get('/subServices/:mainServiceId', getSubServicesByMainServiceId);
router.post('/saveSelectedServices', saveSelectedServicesController);
router.get('/selectedMainServices/:phoneNumber', getSelectedMainServices);
router.get('/selectedSubServices/:shopPhoneNumber/:mainServiceId', getSelectedSubServicesController); // Add the new route
export default router;
