import { AppDataSource } from '../config/data-source.js';
import { TblSalesExecutives } from '../entities/TblSalesExecutives.js';

export const checkUserRepository = async (mobileNumber) => {
  try {
    const salesExecutiveRepository = AppDataSource.getRepository(TblSalesExecutives);
    const user = await salesExecutiveRepository.findOne({ where: { mobileNo: mobileNumber } });
    return !!user;  // Returns true if user exists, false otherwise
  } catch (error) {
    throw new Error('Error in checkUserRepository: ' + error.message);
  }
};


export const submitFormRepository = async (firstName, lastName, mobileNumber, pincode, commissionLevel) => {
	try {
	  const salesExecutiveRepository = AppDataSource.getRepository(TblSalesExecutives);
	  const newSalesExecutive = salesExecutiveRepository.create({
		firstName,
		lastName,
		mobileNo: mobileNumber,
		pincode,
		level: commissionLevel,
	  });
	  await salesExecutiveRepository.save(newSalesExecutive);
	  return true;
	} catch (error) {
	  throw new Error('Error in submitFormRepository: ' + error.message);
	}
  };