import {
    getShopkeeperDetailsByPhoneNumberService,
    getShopkeeperDetailsByShopIDService,
    getShopkeeperServiceDetailsByPhoneNumberService,
    getShopkeeperProductHomeDetailsByPhoneNumberService,
    getShopkeeperByPhoneNumber ,
    getShopkeeperOrdersService, 
    registerShopkeeperService,
    getCustomersService,
    getProductsByShopkeeperService,
    getPaymentsByShopkeeperService,
    placeOrderShopkeeperService
} from '../services/shopkeeperDetailsService.js';

import { NotFoundError } from '../utils/errorHandlers.js';

export const registerShopkeeperController = async(req, res) =>{
    const {
        phoneNumber,
        shopkeeperName,
        shopID,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory,
        selectedSubCategory,
    } = req.body;
    const imageData = req.files['image'] ? req.files['image'][0] : null;
    const bannerData = req.files['banner'] ? req.files['banner'][0] : null;

    try {
        const result = await registerShopkeeperService({
            phoneNumber,
            shopkeeperName,
            shopID,
            pincode,
            shopState,
            city,
            address,
            salesAssociateNumber,
            selectedCategory,
            selectedSubCategory,
            imageData, 
            bannerData
        });

        res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
        console.log('Error registering shopkeeper:', error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error while registering shopkeeper',
            error: error.message,
          });
    }
}

// Get shopkeeper orders by shopid
export const myOrderShopkeeperController = async(req, res) => {
    try {
        const { shopID } = req.query;

        if (!shopID) {
         throw new NotFoundError('Shop ID is required');
        }
    
        const orders = await getShopkeeperOrdersService(shopID);
    
        res.status(200).json({
          message: 'Orders retrieved successfully',
          data: orders
        });
    } catch (error) {
        console.log('Error myOrderShopkeeperController: ', error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error while registering shopkeeper',
            error: error.message,
          });
    }
}

// Get shopkeeper customers by shopid
export const getCustomersByShopkeeperController = async(req, res) => {
    try {
        const { shopID } = req.query;

    if (!shopID) {
        throw new NotFoundError('Shop ID is required');
    }

    const customers = await getCustomersService(shopID);

    res.status(200).json({
      message: 'Customers retrieved successfully',
      data: customers
    });
    } catch (error) {
        console.log('Error getCustomersByShopkeeperController: ', error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error while registering shopkeeper',
            error: error.message,
          });
    }
}

// Get shopkeeper details by phone number
export const productManagerShopkeeperController = async (req, res) => {
    try {
        const { phoneNumber } = req.query;

        if (!phoneNumber) {
        throw new NotFoundError('Phone number is required' );
        }

    const products = await getProductsByShopkeeperService(phoneNumber);

    res.status(200).json({
      message: 'Products retrieved successfully',
      data: products
    });
    } catch (error) {
        console.log('Error productManagerShopkeeperController: ', error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error while fetching Products',
            error: error.message,
          });
    }
}

// Get shopkeeper payment details by phone number
export const paymentManagerShopkeeperController = async (req, res) => {
    try {
        const { shopID, period } = req.query;

        if (!shopID) {
        throw new NotFoundError('Phone number is required');
        }

    const payments = await getPaymentsByShopkeeperService(shopID, period);

    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments
    });
    } catch (error) {
        console.log('Error productManagerShopkeeperController: ', error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error while fetching payments',
            error: error.message,
          });
    }
}

// Get shopkeeper payment details by phone number
export const placeOrderShopkeeperController = async (req, res) => {
    try {
        const { custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, customerName, shopkeeperPhoneNumber } = req.body;
		if(!custPhoneNumber || !shopID || !cartItems || !totalPrice  || !customerName || !shopkeeperPhoneNumber) throw new NotFoundError('Missing required fields');
        console.log(req.body)
      const orderPlace = await placeOrderShopkeeperService(req.body);

    res.status(200).json({
      message: 'order placed successfully',
      data: orderPlace
    });
    } catch (error) {
        console.log('Error placeOrderShopkeeperController: ', error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error while placing order',
            error: error.message,
          });
    }
}

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
        console.log(`Received phoneNumber: ${phoneNumber}`);  // Debugging statement
        const result = await getShopkeeperServiceDetailsByPhoneNumberService(phoneNumber);
        console.log('Service Result:', result);  // Debugging statement
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Controller Error:', error);  // Debugging statement
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
        console.log(`Received phoneNumber: ${phoneNumber}`);  // Debugging statement
        const result = await getShopkeeperProductHomeDetailsByPhoneNumberService(phoneNumber);
        console.log('Service Result:', result);  // Debugging statement
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Controller Error:', error);  // Debugging statement
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper product home details',
            error: error.message,
        });
    }
};


export const getShopkeeper = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
  
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
  
    try {
      const shopkeeper = await getShopkeeperByPhoneNumber(phoneNumber);
      if (!shopkeeper) {
        return res.status(404).json({ error: 'Shopkeeper not found' });
      }
      res.json(shopkeeper);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  };