// src/controllers/customerAddressController.js

import { getCustomerAddressService } from '../services/customerAddressService.js';
import { NotFoundError } from '../utils/errorHandlers.js';

export const getCustomerAddressController = async (req, res) => {
  const { phoneNumber } = req.query;  // Extract from query string

  try {
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const address = await getCustomerAddressService(phoneNumber);
    if (!address) {
      throw new NotFoundError('Address not found for this phone number')
    }
    res.json({ success: true, address });
  } catch (error) {
    console.error('Error in getCustomerAddressController:', error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while fetching Customer Address',
      error: error.message
    });
  }
};
