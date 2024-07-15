// src/services/salesExecutiveService.js

import { checkUserRepository,submitFormRepository  } from '../repositories/salesExecutiveRepository.js';

export const checkUserService = async (mobileNumber) => {
  try {
    return await checkUserRepository(mobileNumber);
  } catch (error) {
    throw new Error('Error in checkUserService: ' + error.message);
  }
};



export const submitFormService = async (firstName, lastName, mobileNumber, pincode, commissionLevel) => {
	try {
	  return await submitFormRepository(firstName, lastName, mobileNumber, pincode, commissionLevel);
	} catch (error) {
	  throw new Error('Error in submitFormService: ' + error.message);
	}
  };