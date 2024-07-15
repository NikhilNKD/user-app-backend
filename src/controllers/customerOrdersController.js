// src/controllers/customerOrdersController.js

import {
	saveOrderService,
	placeOrderService,
	getOrdersService,
	getCustomerOrdersService,
	getOrderDetailsService,
	getCustomerStoresService
  } from '../services/customerOrdersService.js';
  
  export const saveOrderController = async (req, res) => {
	try {
	  const { custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber } = req.body;
  
	  // Validate request body
	  if (!custName || !custPhoneNumber || !cartItems || !totalPrice || !shopID || !shopkeeperName || !shopkeeperPhoneNumber) {
		return res.status(400).json({ success: false, message: 'Missing required fields' });
	  }
  
	  // If selectedDate or selectedTime is not provided, use default values
	  const result = await saveOrderService(custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber);
	  res.json(result);
	} catch (error) {
	  console.error('Error in saveOrderController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };
  
  export const placeOrderController = async (req, res) => {
	try {
	  const { custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, created_at, customerName } = req.body;
	  const result = await placeOrderService(custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, created_at, customerName);
	  res.json(result);
	} catch (error) {
	  console.error('Error in placeOrderController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };
  
  export const getOrdersController = async (req, res) => {
	try {
	  const { custPhoneNumber } = req.query;
	  const result = await getOrdersService(custPhoneNumber);
	  res.json(result);
	} catch (error) {
	  console.error('Error in getOrdersController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };
  
  export const getCustomerOrdersController = async (req, res) => {
	try {
	  const { custPhoneNumber } = req.query;
	  const result = await getCustomerOrdersService(custPhoneNumber);
	  res.json(result);
	} catch (error) {
	  console.error('Error in getCustomerOrdersController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };
  
  export const getOrderDetailsController = async (req, res) => {
	try {
	  const { shopID, custPhoneNumber } = req.query;
	  const result = await getOrderDetailsService(shopID, custPhoneNumber);
	  res.json(result);
	} catch (error) {
	  console.error('Error in getOrderDetailsController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };
  
  export const getCustomerStoresController = async (req, res) => {
	try {
	  const { custPhoneNumber } = req.query;
	  const result = await getCustomerStoresService(custPhoneNumber);
	  res.json(result);
	} catch (error) {
	  console.error('Error in getCustomerStoresController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };
  