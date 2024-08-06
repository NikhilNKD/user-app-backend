import multer from "multer";
import { uploadImage } from "../services/s3Service.js";
export const uploadS3 = multer({ storage: multer.memoryStorage() });

export const uploadImageToS3 = async(imageData,key) =>{
    // let key;
      if (imageData.buffer) {
        key = key;
        try {
         const data =  await uploadImage(imageData, key)
         return data
        } catch (error) {
          throw new Error (error.message)
        }
      }
  }

export const parseOpenAIResponse = async (content) => {
    const extractValue = (label) => {
        const match = content.match(new RegExp(`\\*\\*${label}\\*\\*\\s*:\\s*([^\\n]*)`, 'i'));
        return match ? match[1].trim() : null;
    };
    return {
        mainCategory: extractValue('Main Category'),
        productName: extractValue('Product Name'),
        brandName: extractValue('Brand Name'),
        price: extractValue('Price') === 'Not explicitly mentioned; presumed to be missing from the detected text.' ? null : extractValue('Price'),
        weight: extractValue('Weight') ? extractValue('Weight').split(' ')[0] + ' grams' : null,
        picture_path: extractValue('Picture Path'),
        preciseBrandName: extractValue('Precise Brand Name'),
        type: extractValue('Type'),
        weightType: extractValue('Weight Type')
    };
};

export const getDateRange = (period) => {
  const now = new Date();
  let startDate;
  switch (period) {
    case 'today':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'yesterday':
      startDate = new Date(now.setDate(now.getDate() - 1)).setHours(0, 0, 0, 0);
      break;
    case 'one_week':
      startDate = new Date(now.setDate(now.getDate() - 7)).setHours(0, 0, 0, 0);
      break;
    case '30_days':
      startDate = new Date(now.setDate(now.getDate() - 30)).setHours(0, 0, 0, 0);
      break;
    case 'all_time':
      startDate = new Date('1970-01-01'); // Very old date for all-time range
      break;
    default:
      throw new Error('Invalid period');
  }
  return {
    startDate: new Date(startDate),
    endDate: new Date()
  };
};
