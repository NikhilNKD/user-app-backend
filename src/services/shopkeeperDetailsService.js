// src/services/shopkeeperDetailsService.js
import {
    getShopkeeperDetailsByPhoneNumber,
    getShopkeeperDetailsByShopID,
    getShopkeeperServiceDetailsByPhoneNumber,
    getShopkeeperProductHomeDetailsByPhoneNumber,
    findShopkeeperByPhoneNumber,
    getMyOrdersShopkeeper,
    getCustomersByShopID,
    getProductsByShopkeeper,
    getPaymentsByShopkeeper,
    getOrderPlacedByShopkeeper
} from '../repositories/shopkeeperDetailsRepository.js';
import { getSalesExecutiveRepos, getShopkeeperRepo } from '../repositories/salesExecutiveRepository.js';
import { uploadImageToS3 } from '../utils/helper.js';
import { ConflictError, InternalServerError, NotFoundError } from '../utils/errorHandlers.js';

// register shopkeeper
export const registerShopkeeperService = async (shopkeeperData)=>{
    try {
        // console.log(shopkeeperData)
        if (!shopkeeperData || !shopkeeperData.phoneNumber || !shopkeeperData.shopID || !shopkeeperData.shopType ) {
            throw new NotFoundError("Required fields are missing");
        }
        const shopkeeperRepo = await getShopkeeperRepo();
        const exists = await shopkeeperRepo.findOne({ where: { phoneNumber: shopkeeperData.phoneNumber } })
        if (exists) {
          throw new ConflictError("Shopkeeper is already registed");
        }
        if(shopkeeperData.salesAssociateNumber){
          const salesAssociateRepo = getSalesExecutiveRepos();
          const salesAssociate = await salesAssociateRepo.findOne({ where: { phoneNumber: shopkeeperData.salesAssociateNumber } });
          if (!salesAssociate) {
              throw new NotFoundError("Sales Associate number is not valid");
          }
        }
        let imageData = shopkeeperData.imageData;
        let bannerData = shopkeeperData.bannerData;
        const imageKey = imageData ? `${imageData.originalname}_${Date.now()}` : null;
        const bannerKey = bannerData ? `${bannerData.originalname}_${Date.now()}` : null;
        const [imageUrl, bannerUrl] = await Promise.all([
          imageData ? uploadImageToS3(imageData, imageKey) : Promise.resolve(null),
          bannerData ? uploadImageToS3(bannerData, bannerKey) : Promise.resolve(null)
        ]);
        
        delete shopkeeperData.imageData;

        const shopkeeper = shopkeeperRepo.create({
          ...shopkeeperData,
          profilePicture: imageUrl,
          shopBanner:bannerUrl 
        });
        await shopkeeperRepo.save(shopkeeper);
        return { status: 200, message: "Shopkeeper registered successfully", data: shopkeeper };
    } catch (error) {
        console.error("Error in registerSalesService", error.message);
        throw error
    }
}

// my orders shopkeeper
export const getShopkeeperOrdersService = async (shopID) => {
    try {
        const orders = await getMyOrdersShopkeeper(shopID);
        return orders;
    } catch (error) {
        throw error;
    }
}

// my orders shopkeeper
export const getCustomersService = async (shopID) => {
    try {
        const orders = await getCustomersByShopID(shopID);
        return orders;
    } catch (error) {
        throw error;
    }
    
  };

// Get shopkeeper details by phone number
export const getShopkeeperDetailsByPhoneNumberService = async (phoneNumber) => {
    try {
        const shopkeeper = await getShopkeeperDetailsByPhoneNumber(phoneNumber);
        if (shopkeeper) {
            return {
                status: 200,
                success: true,
                data: shopkeeper,
                message: 'Shopkeeper details fetched successfully',
            };
        }
        throw new NotFoundError("Shopkeeper not found")
    } catch (error) {
        throw error;
    }
};

// Get shopkeeper details by shop ID
export const getShopkeeperDetailsByShopIDService = async (shopID) => {
    try {
        const shopkeeper = await getShopkeeperDetailsByShopID(shopID);
        if (shopkeeper) {
            return {
                status: 200,
                success: true,
                data: shopkeeper,
                message: 'Shopkeeper details fetched successfully',
            };
        }
        throw new NotFoundError("Shopkeeper not found")
    } catch (error) {
        throw error;
    }
};

// Get shopkeeper details by shop ID
export const getProductsByShopkeeperService = async (shopID) => {
    try {
        const shopkeeper = await getProductsByShopkeeper(shopID);
        if (shopkeeper) return shopkeeper 
           
        throw new NotFoundError("products not found")
    } catch (error) {
        throw error;
    }
};

// Get shopkeeper details by shop ID
export const getPaymentsByShopkeeperService = async (shopID, period) => {
    try {
        const shopkeeper = await getPaymentsByShopkeeper(shopID, period);
        if (shopkeeper) {
            return shopkeeper
        }
        throw new NotFoundError("no payments")
    } catch (error) {
        throw error;
    }
};

// Get shopkeeper details by shop ID
export const placeOrderShopkeeperService = async (orderDetails) => {
    try {
        const order = await getOrderPlacedByShopkeeper(orderDetails);
        if (order) return order;
        throw new NotFoundError("no order placed")
    } catch (error) {
        throw error;
    }
};

// Get shopkeeper service details by phone number
export const getShopkeeperServiceDetailsByPhoneNumberService = async (phoneNumber) => {
    try {
        const details = await getShopkeeperServiceDetailsByPhoneNumber(phoneNumber);
        if (details) {
            return {
                status: 200,
                success: true,
                data: details,
                message: 'Shopkeeper service details fetched successfully',
            };
        }
        return {
            status: 404,
            success: false,
            data: null,
            message: 'Shopkeeper service details not found',
        };
    } catch (error) {
        throw new Error('Error fetching shopkeeper service details: ' + error.message);
    }
};

// Get shopkeeper product home details by phone number
export const getShopkeeperProductHomeDetailsByPhoneNumberService = async (phoneNumber) => {
    try {
        const details = await getShopkeeperProductHomeDetailsByPhoneNumber(phoneNumber);
        if (details) {
            return {
                status: 200,
                success: true,
                data: details,
                message: 'Shopkeeper product home details fetched successfully',
            };
        }
        return {
            status: 404,
            success: false,
            data: null,
            message: 'Shopkeeper product home details not found',
        };
    } catch (error) {
        console.error('Service Error:', error);  // Debugging statement
        throw new Error('Error fetching shopkeeper product home details: ' + error.message);
    }
};


 

export const getShopkeeperByPhoneNumber = async (phoneNumber) => {
  return await findShopkeeperByPhoneNumber(phoneNumber);
};
