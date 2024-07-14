// src/routes/v1/shopkeeperDetailsRoutes.js
import { Router } from 'express';
import {
    getShopkeeperDetailsByPhoneNumberController,
    getShopkeeperDetailsByShopIDController,
    getShopkeeperServiceDetailsController,
    getShopkeeperProductHomeDetailsController
} from '../../controllers/shopkeeperDetailsController.js';

const router = Router();

// Route to get shopkeeper details by phone number
router.get('/details', getShopkeeperDetailsByPhoneNumberController);

// Route to get shopkeeper details by shop ID
router.get('/detailsByShopID', getShopkeeperDetailsByShopIDController);

// Route to get shopkeeper service details
router.get('/service/:phoneNumber', getShopkeeperServiceDetailsController);

// Route to get shopkeeper product home details
router.get('/productHome/:phoneNumber', getShopkeeperProductHomeDetailsController);

export default router;
