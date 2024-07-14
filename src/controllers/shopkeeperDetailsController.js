import {
    getShopkeeperDetailsByPhoneNumberService,
    getShopkeeperDetailsByShopIDService,
    getShopkeeperServiceDetailsByPhoneNumberService,
    getShopkeeperProductHomeDetailsByPhoneNumberService
} from '../services/shopkeeperDetailsService.js';

// Get shopkeeper details by phone number
export const getShopkeeperDetailsByPhoneNumberController = async (req, res) => {
    try {
        const { phoneNumber } = req.query;
        const result = await getShopkeeperDetailsByPhoneNumberService(phoneNumber);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper details by phone number',
            error: error.message,
        });
    }
};

// Get shopkeeper details by shop ID
export const getShopkeeperDetailsByShopIDController = async (req, res) => {
    try {
        const { shopID } = req.query;
        const result = await getShopkeeperDetailsByShopIDService(shopID);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper details by shop ID',
            error: error.message,
        });
    }
};

// Get shopkeeper service details
export const getShopkeeperServiceDetailsController = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const result = await getShopkeeperServiceDetailsByPhoneNumberService(phoneNumber);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper service details',
            error: error.message,
        });
    }
};

// Get shopkeeper product home details
export const getShopkeeperProductHomeDetailsController = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const result = await getShopkeeperProductHomeDetailsByPhoneNumberService(phoneNumber);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper product home details',
            error: error.message,
        });
    }
};