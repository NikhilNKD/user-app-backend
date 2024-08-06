// src/controllers/mainServiceController.js
import { getMainServicesBySubCategoryService, registerServiceProviderService } from '../services/shopkeeperServices.js';
import { getSubServicesByMainServiceIdService,getSelectedMainServicesService ,saveSelectedServicesService,getSelectedSubServicesService  } from '../services/shopkeeperServices.js';

export const registerServiceController =async(req, res) =>{
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
  const imageData = req.files['image'] ? req.files['image'][0] : null;
  const bannerData = req.files['banner'] ? req.files['banner'][0] : null;

  try {
      const result = await registerServiceProviderService({
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
          imageData, 
          bannerData
      });

      res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
      console.log('Error registering shopkeeper:', error.message);
      res.status(error.statusCode || 500).json({
          success: false,
          data: null,
          message: error.message || 'Error while registering Service provider',
          error: error.message,
        });
  }
}


export const getMainServicesBySubCategory = async (req, res) => {
    const { selectedSubCategory } = req.params;
    try {
        const services = await getMainServicesBySubCategoryService(selectedSubCategory);
        res.status(200).json({
            success: true,
            data: services,
            message: 'Main services fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: error.message
        });
    }
};



export const getSubServicesByMainServiceId = async (req, res) => {
    const { mainServiceId } = req.params;
    try {
      const subServices = await getSubServicesByMainServiceIdService(mainServiceId);
      res.status(200).json({
        success: true,
        data: subServices,
        message: 'Sub-services fetched successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: 'Internal server error',
        error: error.message
      });
    }
  };
  
 
  export const saveSelectedServicesController = async (req, res) => {
    const { phoneNumber, selectedServices } = req.body;

    try {
        const result = await saveSelectedServicesService(phoneNumber, selectedServices);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Selected services saved successfully'
        });
    } catch (error) {
        console.error('Error in saveSelectedServicesController:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: error.message
        });
    }
};

  
  
  export const getSelectedMainServices = async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const services = await getSelectedMainServicesService(phoneNumber);
        res.status(200).json({
          success:true,
          data:services,
          message:"selected services saved succesfully"
        
        
        });
    } catch (error) {
        console.error('Error fetching selected main services:', error);
        res.status(500).json({
          success:false, 
          data:null,
          message: 'Internal server error', 
          error: error.message 
        });
    }
};



export const getSelectedSubServicesController = async (req, res) => {
  const { shopPhoneNumber, mainServiceId } = req.params;
  try {
      const subServices = await getSelectedSubServicesService(shopPhoneNumber, mainServiceId);
      res.status(200).json({
          success: true,
          data: subServices,
          message: 'Selected sub-services fetched successfully'
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          data: null,
          message: 'Internal server error',
          error: error.message
      });
  }
};