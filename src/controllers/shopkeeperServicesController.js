// src/controllers/mainServiceController.js
import { getMainServicesBySubCategoryService } from '../services/shopkeeperServices.js';
import { getSubServicesByMainServiceIdService } from '../services/shopkeeperServices.js';


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