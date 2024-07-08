// services/shopService.js
import { AppDataSource } from '../config/data-source.js';
import { Shop } from '../entities/Shop.js';

const shopRepository = AppDataSource.getRepository(Shop);

export const getShopsByPincode = async (pincode) => {
  try {
    return await shopRepository.find({ where: { pincode } });
  } catch (error) {
    throw new Error('Error fetching shops in pincode: ' + error.message);
  }
};
