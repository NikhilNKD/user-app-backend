// src/repositories/customerOrdersRepository.js

import { AppDataSource } from '../config/data-source.js';
import { TblOrders } from '../entities/TblOrders.js';

export const saveOrderRepository = async (custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber) => {
	try {
	  const orderRepository = AppDataSource.getRepository(TblOrders);
	  const order = orderRepository.create({
		customerName: custName,
		custPhoneNumber,
		cartItems,
		totalPrice,
		selectedDate,
		selectedTime,
		shopID,
		shopkeeperName,
		shopkeeperPhoneNumber,
	  });
	  await orderRepository.save(order);
	  return { success: true, message: 'Order saved successfully' };
	} catch (error) {
	  throw new Error('Error in saveOrderRepository: ' + error.message);
	}
  };

export const placeOrderRepository = async (custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, created_at, customerName) => {
  try {
    const orderRepository = AppDataSource.getRepository(TblOrders);
    const order = orderRepository.create({
      custPhoneNumber,
      shopID,
      cartItems,
      totalPrice,
      selectedDate,
      selectedTime,
      created_at,
      customerName,
    });
    await orderRepository.save(order);
    return { success: true, message: 'Order placed successfully' };
  } catch (error) {
    throw new Error('Error in placeOrderRepository: ' + error.message);
  }
};

export const getOrdersRepository = async (custPhoneNumber) => {
  try {
    const orderRepository = AppDataSource.getRepository(TblOrders);
    const orders = await orderRepository.find({ where: { custPhoneNumber } });
    return { success: true, orders };
  } catch (error) {
    throw new Error('Error in getOrdersRepository: ' + error.message);
  }
};

export const getCustomerOrdersRepository = async (custPhoneNumber) => {
  try {
    const orderRepository = AppDataSource.getRepository(TblOrders);
    const orders = await orderRepository.find({
      where: { custPhoneNumber },
      order: { created_at: 'DESC' },
    });
    return { success: true, orders };
  } catch (error) {
    throw new Error('Error in getCustomerOrdersRepository: ' + error.message);
  }
};

export const getOrderDetailsRepository = async (shopID, custPhoneNumber) => {
  try {
    const orderRepository = AppDataSource.getRepository(TblOrders);
    const orders = await orderRepository.find({
      where: { custPhoneNumber, shopID },
      order: { created_at: 'DESC' },
    });
    return { success: true, orders: orders.map(order => ({
      ...order,
      cartItems: JSON.parse(order.cartItems)
    })) };
  } catch (error) {
    throw new Error('Error in getOrderDetailsRepository: ' + error.message);
  }
};

export const getCustomerStoresRepository = async (custPhoneNumber) => {
  try {
    const orderRepository = AppDataSource.getRepository(TblOrders);
    const stores = await orderRepository
      .createQueryBuilder('order')
      .select('DISTINCT(order.shopID)', 'shopID')
      .where('order.custPhoneNumber = :custPhoneNumber', { custPhoneNumber })
      .getRawMany();
    return { success: true, stores };
  } catch (error) {
    throw new Error('Error in getCustomerStoresRepository: ' + error.message);
  }
};
