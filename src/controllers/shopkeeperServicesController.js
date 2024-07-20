// src/controllers/mainServiceController.js
import { getMainServicesBySubCategoryService } from '../services/shopkeeperServices';

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