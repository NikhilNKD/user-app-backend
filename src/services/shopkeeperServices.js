// src/services/mainServiceService.js
import { getSalesExecutiveRepos, getShopkeeperRepo } from '../repositories/salesExecutiveRepository.js';
import { getMainServicesBySubCategoryRepository ,getSubServicesByMainServiceId,saveSelectedServices,getSelectedMainServicesRepository,getSelectedSubServicesRepository   } from '../repositories/shopkeeperServiceRepository.js';

export const registerServiceProviderService = async (shopkeeperData)=>{
  try {
      // console.log(shopkeeperData)
      if (!shopkeeperData || !shopkeeperData.phoneNumber || !shopkeeperData.shopID ) {
          throw new NotFoundError("Required fields are missing");
      }
      const shopkeeperRepo = await getShopkeeperRepo();
      const salesAssociateRepo = getSalesExecutiveRepos();
      
      const exists = await shopkeeperRepo.findOne({ where: { phoneNumber: shopkeeperData.phoneNumber } })
      if (exists) {
        throw new ConflictError("Shopkeeper is already registed");
      }
      if(shopkeeperData.salesAssociateNumber){
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
      return { status: 200, message: "Service Provider registered successfully", data: shopkeeper };
  } catch (error) {
      console.error("Error in registerServiceProviderService", error.message);
      throw error
  }
}

export const getMainServicesBySubCategoryService = async (subCategory) => {
    try {
        const services = await getMainServicesBySubCategoryRepository(subCategory);
        return services;
    } catch (error) {
        throw new Error('Error fetching main services: ' + error.message);
    }
};




export const getSubServicesByMainServiceIdService = async (mainServiceId) => {
    try {
      const subServices = await getSubServicesByMainServiceId(mainServiceId);
      return subServices;
    } catch (error) {
      throw new Error('Error fetching sub-services: ' + error.message);
    }
  };

  
  
  
// src/services/shopkeeperServices.js
export const saveSelectedServicesService = async (phoneNumber, selectedServices) => {
  try {
      await saveSelectedServices(phoneNumber, selectedServices);
      return { message: 'Selected services saved successfully.' };
  } catch (error) {
      console.error('Error in saveSelectedServicesService:', error);
      throw new Error('Internal server error');
  }
};

  
  
  export const getSelectedMainServicesService = async (phoneNumber) => {
    try {
        const services = await getSelectedMainServicesRepository(phoneNumber);
        return services;
    } catch (error) {
        throw new Error('Error fetching selected main services: ' + error.message);
    }
};


export const getSelectedSubServicesService = async (shopPhoneNumber, mainServiceId) => {
  try {
      const subServices = await getSelectedSubServicesRepository(shopPhoneNumber, mainServiceId);
      return subServices;
  } catch (error) {
      throw new Error('Error fetching selected sub-services: ' + error.message);
  }
};