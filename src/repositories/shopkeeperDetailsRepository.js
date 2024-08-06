// src/repositories/shopkeeperDetailsRepository.js
import { AppDataSource } from '../config/data-source.js';
import { Between, In } from 'typeorm';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { TblOrders } from '../entities/TblOrders.js';
import { NewCustomer } from '../entities/NewCustomer.js';
import { ShopkeeperProducts } from '../entities/ShopkeeperProducts.js';
import { TblProductMaster } from '../entities/TblProductMaster.js';
import { getDateRange } from '../utils/helper.js';

// Get shopkeeper orders by shopID
export const getMyOrdersShopkeeper = async (shopID) => {
  try {
    const orderRepo = AppDataSource.getRepository(TblOrders);
    const productRepo = AppDataSource.getRepository(TblProductMaster);

    // Fetch orders for the given shopID
    const orders = await orderRepo.find({
      where: { shopID },
    });

    // Flatten and deduplicate the array of product IDs from cartItems
    const productIds = Array.from(
      new Set(
        orders.flatMap((order) => {
          return order.cartItems.map((item) => item.id); 
        })
      )
    );

    // Fetch product details using the deduplicated product IDs
    const products = await productRepo.find({
      where: { id: In(productIds) },
    });

    // Map products by ID for easy lookup
    const productMap = products.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {});

    // Map orders to include product details
    const enrichedOrders = orders.map((order) => {
      return {
        orderId: order.id,
        products: order.cartItems.map((item) => ({
          productId: item.id,
          productName: productMap[item.id]?.product_name || 'Unknown',
          brandName: productMap[item.id]?.brand_name || 'Unknown',
          quantity: item.quantity,
          price: productMap[item.id]?.price || 0,
        })),
      };
    });
    return enrichedOrders;
  } catch (error) {
    throw new Error('while fetching orders');
  }
};


// Get shopkeeper costumers by shopID
export const getCustomersByShopID = async (shopID) => {
  try {
    const orderRepo = AppDataSource.getRepository(TblOrders);
    const customerRepo = AppDataSource.getRepository(NewCustomer);

    const orders = await orderRepo.find({ where: { shopID } });
    const phoneNumbers = [
      ...new Set(orders.map((order) => order.custPhoneNumber)),
    ];
    const customers = await customerRepo.find({
      where: { phoneNumber: In(phoneNumbers) },
    });
    return customers.map((customer) => ({
      name: customer.name,
      address: customer.address,
      mobile: customer.phoneNumber,
    }));
  } catch (error) {
    throw new Error('while fetching Customers');
  }
};

// Get shopkeeper products  by phoneNumber
export const getProductsByShopkeeper = async (phoneNumber) => {
  try {
    const shopkeeperProductRepo =
      AppDataSource.getRepository(ShopkeeperProducts);
    // Fetch products for the given phoneNumber
    const products = await shopkeeperProductRepo
      .createQueryBuilder('shopkeeperProduct')
      .leftJoinAndSelect('shopkeeperProduct.product', 'product')
      .where('shopkeeperProduct.phoneNumber = :phoneNumber', { phoneNumber })
      .getMany();
    // Map to include only necessary fields
    return products.map((shopkeeperProduct) => {
      return {
        productId: shopkeeperProduct.productId,
        image: shopkeeperProduct.product.picture_path,
        quantity: shopkeeperProduct.product.weight,
        code: shopkeeperProduct.product.productId,
        product_name: shopkeeperProduct.product.product_name,
      };
    });
  } catch (error) {
    throw new Error('while fetching products');
  }
};

// Get shopkeeper payments  by phoneNumber
export const getPaymentsByShopkeeper = async (shopID, period) => {
  try {
    // console.log(phoneNumber, period)
    const { startDate, endDate } = getDateRange(period);
    const orderRepo = AppDataSource.getRepository(TblOrders);
    
    // Fetch orders within the date range
    const orders = await orderRepo.find({
      where: {
        shopID,
        created_at: Between(startDate, endDate)
      }
    });
    // Calculate total payments
    const totalPayments = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
    const data = orders.map(order => ({
      orderId: order.id,
      customerPhoneNumber: order.custPhoneNumber,
      address: order.address || null, 
      pincode: order.pincode || null,  
      cartItems: order.cartItems.map(item => ({
        productId: item.id,
        brandName: item.brand_name,
        productName: item.product_name,
        quantity: item.quantity,
        weight: item.weight,
        price: item.price,
        picturePath: item.picture_path, 
      })),
    }));
    return {
      period,
      totalPayments,
      data
    };
  } catch (error) {
    console.log(error.message)
    throw error;
  }
};

// Get shopkeeper costumers by shopID
export const getOrderPlacedByShopkeeper = async (orderDetails) => {
  try {
    const orderRepository = AppDataSource.getRepository(TblOrders);
    const { custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, customerName, shopkeeperPhoneNumber } = orderDetails;

    const order = orderRepository.create({
      custPhoneNumber,
      shopID,
      cartItems,
      totalPrice,
      selectedDate,
      selectedTime,
      customerName,
      shopkeeperPhoneNumber
    });
    
    await orderRepository.save(order);
    return {orderID: order.id}
  } catch (error) {
    throw error;
  }
};

// Get shopkeeper details by phone number
export const getShopkeeperDetailsByPhoneNumber = async (phoneNumber) => {
  const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
  return await shopkeeperRepo.findOneBy({ phoneNumber });
};

// Get shopkeeper details by shop ID
export const getShopkeeperDetailsByShopID = async (shopID) => {
  const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
  return await shopkeeperRepo.findOneBy({ shopID });
};

// Get shopkeeper service details by phone number
export const getShopkeeperServiceDetailsByPhoneNumber = async (phoneNumber) => {
  const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
  return await shopkeeperRepo.findOneBy({ phoneNumber });
};

export const getShopkeeperProductHomeDetailsByPhoneNumber = async (
  phoneNumber
) => {
  const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
  return await shopkeeperRepo.findOne({
    where: { phoneNumber },
    select: [
      'shopkeeperName',
      'shopID',
      'pincode',
      'shopState',
      'city',
      'address',
      'salesAssociateNumber',
      'selectedCategory',
      'selectedSubCategory',
    ],
  });
};

const shopkeeperRepository = AppDataSource.getRepository(Shopkeeper);
export const findShopkeeperByPhoneNumber = async (phoneNumber) => {
  return await shopkeeperRepository.findOneBy({ phoneNumber });
};
