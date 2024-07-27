import { checkUserService } from '../services/salesExecutiveService.js';
import { submitFormService , registerSalesService} from '../services/salesExecutiveService.js';
export const checkUserController = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    if (!mobileNumber) {
      return res.status(400).json({ success: false, message: 'Mobile number is required' });
    }

    const userExists = await checkUserService(mobileNumber);
    res.json({ exists: userExists });
  } catch (error) {
    console.error('Error in checkUserController:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};



export const submitFormController = async (req, res) => {
	const { firstName, lastName, mobileNumber, pincode } = req.body;
	const commissionLevel = 'L0';
  
	try {
	  if (!firstName || !lastName || !mobileNumber || !pincode) {
		return res.status(400).json({ success: false, message: 'All fields are required' });
	  }
  
	  const result = await submitFormService(firstName, lastName, mobileNumber, pincode, commissionLevel);
	  res.json({ success: result });
	} catch (error) {
	  console.error('Error in submitFormController:', error);
	  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
	}
  };

  export const registerSalesController = async (req, res) => {
    const {
      phoneNumber,
      shopkeeperName,
      shopID,
      pincode,
      shopState,
      city,
      address,
      salesAssociateNumber,
      selectedCategory,
      selectedSubCategory,
    } = req.body;
    console.log("here")
    try {
      await registerSalesService({
        phoneNumber,
        shopkeeperName,
        shopID,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory,
        selectedSubCategory,
      });
  
      res.status(200).json({ message: 'Shopkeeper registered successfully' });
    } catch (error) {
      console.error('Error registering shopkeeper:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };