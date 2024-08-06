// src/routes/v1/shopkeeperDetailsRoutes.js
import { Router } from 'express';
import {
    getShopkeeperDetailsByPhoneNumberController,
    getShopkeeperDetailsByShopIDController,
    getShopkeeperServiceDetailsController,
    getShopkeeperProductHomeDetailsController,
    getShopkeeper,
    registerShopkeeperController,
    myOrderShopkeeperController,
    getCustomersByShopkeeperController,
    productManagerShopkeeperController,
    paymentManagerShopkeeperController,
    placeOrderShopkeeperController
} from '../../controllers/shopkeeperDetailsController.js';
import { uploadS3 } from '../../utils/helper.js';

const router = Router();

// Route to register shopkeeper 
router.post('/register-shopkeeper', uploadS3.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]), registerShopkeeperController);

// Route to get shopkeeper orders by shopID
router.get('/my-orders', myOrderShopkeeperController);

// Route to get shopkeeper customers by shopID
router.get('/shopkeeper-customers', getCustomersByShopkeeperController);

// Route to get shopkeeper customers by shopID
router.get('/shopkeeper-products', productManagerShopkeeperController);

// Route to get shopkeeper payments by shopID
router.get('/shopkeeper-payments', paymentManagerShopkeeperController);

// Route to get shopkeeper payments by shopID
router.post('/place-order', placeOrderShopkeeperController);

// Route to get shopkeeper details by phone number
router.get('/details/:phoneNumber', getShopkeeperDetailsByPhoneNumberController);

// Route to get shopkeeper details by shop ID
router.get('/detailsByShopID', getShopkeeperDetailsByShopIDController);

// Route to get shopkeeper service details
router.get('/service/:phoneNumber', getShopkeeperServiceDetailsController);

// Route to get shopkeeper product home details
router.get('/productHome/:phoneNumber', getShopkeeperProductHomeDetailsController); 

router.get('/shopkeeper', getShopkeeper);
export default router;
