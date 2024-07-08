// controllers/shopController.js
import { getShopsByPincode } from '../services/shopService.js';

export const getShopsByPincodeController = async (req, res) => {
  const { pincode } = req.params;
  try {
    const shops = await getShopsByPincode(pincode);
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
