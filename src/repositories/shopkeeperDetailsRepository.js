// src/repositories/shopkeeperDetailsRepository.js
import { AppDataSource } from '../config/data-source.js';
import { In } from 'typeorm';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { TblOrders } from '../entities/TblOrders.js';
import { NewCustomer } from '../entities/NewCustomer.js';
import { ShopkeeperProducts } from '../entities/ShopkeeperProducts.js';

// Get shopkeeper orders by shopID
export const getMyOrdersShopkeeper = async (shopID) => {
  try {
    const orderRepo = AppDataSource.getRepository(TblOrders);
    return await orderRepo.find({ where: { shopID } });
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
console.log(products)
    // Map to include only necessary fields
    return products.map((shopkeeperProduct) => {
        console.log(shopkeeperProduct, "fskl")
        return {
      productId: shopkeeperProduct.productId,
      image: shopkeeperProduct.product.picture_path, 
      quantity: shopkeeperProduct.product.weight, 
      code: shopkeeperProduct.product.brand_name, 
      product_name: shopkeeperProduct.product.product_name, 
    }});
  } catch (error) {
    throw new Error('while fetching products');
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
