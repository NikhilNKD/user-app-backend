// services/customerService.js
import { AppDataSource } from '../config/data-source.js';
import { NewCustomer } from '../entities/NewCustomer.js';

const customerRepository = AppDataSource.getRepository(NewCustomer);

export const updatePincode = async (phoneNumber, newPincode) => {
  try {
    await customerRepository.update({ phoneNumber }, { pincode: newPincode });
    return { message: 'Pincode updated successfully' };
  } catch (error) {
    throw new Error('Error updating pincode: ' + error.message);
  }
};
