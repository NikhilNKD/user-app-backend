// services/shopkeeperService.js
import { AppDataSource } from '../config/data-source.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';

const shopkeeperRepository = AppDataSource.getRepository(Shopkeeper);

export const getShopkeeperDetailsByPhoneNumberOrShopID = async (phoneNumber) => {
  try {
    // Fetch by phone number
    let shopkeeper = await shopkeeperRepository.findOne({ where: { phoneNumber } });

    // If not found, fetch by shop ID
    if (!shopkeeper) {
      shopkeeper = await shopkeeperRepository.findOne({ where: { shopID: phoneNumber } });
    }

    if (!shopkeeper) {
      throw new Error('Shopkeeper not found');
    }

    return shopkeeper;
  } catch (error) {
    throw new Error('Error fetching shopkeeper details: ' + error.message);
  }
};
