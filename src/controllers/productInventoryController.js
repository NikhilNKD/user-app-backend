// src/controllers/productInventoryController.js
import { getProductsByCategory, addProductToShopkeeper , addMediaProductService} from '../services/productInventoryService.js';
import { BadRequestError, CustomError, InternalServerError, NotFoundError } from '../utils/errorHandlers.js';


// Fetch products by category
export const getProductsByCategoryController = async (req, res) => {
    try {
        const { category } = req.params;
        console.log('Selected Category:', category); // Debugging statement
        const products = await getProductsByCategory(category);
        console.log('Fetched Products:', products); // Debugging statement
        res.status(200).json({
            success: true,
            data: products,
            message: 'Products fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeperController = async (req, res) => {
    try {
        const { shopID } = req.body;
        const productData = req.body;
        if (!req.body) throw new BadRequestError("Request body is missing.");
        if (!shopID)  throw new BadRequestError("Shopkeeper shopID is required.");
        if (!productData)  throw new BadRequestError("Product data is required.");

        const requiredFields = ['product_name', 'brand_name', 'price', 'weight', 'weight_type'];
        for (const field of requiredFields) {
          if (!productData[field]) {
           throw new NotFoundError(`Missing required field: ${field}`);
          }
        }
        
        // Validate price as a number
        if (isNaN(productData.price) || parseFloat(productData.price) <= 0) {
          return res.status(400).send('Invalid price value');
        }
        let picture_path = null;
        if(req.file){
            picture_path = req.file;
        }
        const product = await addProductToShopkeeper(shopID, productData, picture_path);
        res.status(200).json({
            success: true,
            data: product,
            message: 'Product added to shopkeeper\'s list successfully'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error adding product to shopkeeper\'s list',
            error: error.message
        });
    }
};

// Add a product to a shopkeeper's list with attached media
export const addMediaProductToShopkeeperController = async (req, res) => {
    try {
        if(!req.file) throw new BadRequestError("Picture is missing");
        if(!req.body) throw new BadRequestError("PhoneNumber is missing");
        const mediaFiles = req.file;
        const { shopkeeperPhoneNumber } = req.body;

        const result = await addMediaProductService(shopkeeperPhoneNumber, mediaFiles);
        // const results = await Promise.all(
        //     mediaFiles.map(file => addMediaProductService(shopkeeperPhoneNumber, file))
        // );

        res.status(200).json({
            success: true,
            data: null,
            message: 'Product added using mediafile to shopkeeper\'s list successfully',
            result: result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error adding product using media file to shopkeeper\'s list',
            error: error.message
        });
    }
};
