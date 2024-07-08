import {updatePincode} from "../services/customerService";



export const updatePincodeController = async (req, res) => {
  const { phoneNumber, newPincode } = req.body;
  try {
    const result = await updatePincode(phoneNumber, newPincode);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
