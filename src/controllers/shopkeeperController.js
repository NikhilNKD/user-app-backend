// controllers/shopkeeperController.js
import { getShopkeeperDetailsByPhoneNumberOrShopID } from '../services/shopkeeperService.js';

export const getShopkeeperDetailsController = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const shopkeeper = await getShopkeeperDetailsByPhoneNumberOrShopID(phoneNumber);
    res.status(200).json(shopkeeper);
  } catch (error) {
    if (error.message === 'Shopkeeper not found') {
      res.status(404).json({ message: 'Shopkeeper not found' });
    } else {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
};
