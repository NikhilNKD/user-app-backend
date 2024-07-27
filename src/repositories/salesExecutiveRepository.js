import { AppDataSource } from '../config/data-source.js';
import { TblSalesExecutives } from '../entities/TblSalesExecutives.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { Commission } from '../entities/Commission.js';
import { TblCommission } from '../entities/TblCommission.js';
export const getShopkeeperRepo = async () => {
    return AppDataSource.getRepository(Shopkeeper);
}
export const getCommissionRepo = async () => {
    return AppDataSource.getRepository(Commission);
}
export const getTblCommissionRepo = async () => {
    return AppDataSource.getRepository(TblCommission);
}

export const getSalesExecutiveRepos = async () => {
	return AppDataSource.getRepository(TblSalesExecutives);
}


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