import { AppDataSource } from '../config/data-source.js';
import { TblSalesExecutives } from '../entities/TblSalesExecutives.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { Commission } from '../entities/Commission.js';
import { TblCommission } from '../entities/TblCommission.js';


export const getShopkeeperRepo = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(Shopkeeper) : AppDataSource.getRepository(Shopkeeper);
};

export const getCommissionRepo = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(Commission) : AppDataSource.getRepository(Commission);
};

export const getTblCommissionRepo = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(TblCommission) : AppDataSource.getRepository(TblCommission);
};

export const getSalesExecutiveRepos = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(TblSalesExecutives) : AppDataSource.getRepository(TblSalesExecutives);
};


export const checkUserRepository = async (mobileNumber) => {
  try {
    const salesExecutiveRepository = AppDataSource.getRepository(TblSalesExecutives);
    const user = await salesExecutiveRepository.findOne({ where: { phoneNumber: mobileNumber } });
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
		phoneNumber: mobileNumber,
		pincode,
		level: commissionLevel,
	  });
	  await salesExecutiveRepository.save(newSalesExecutive);
	  return true;
	} catch (error) {
	  throw new Error('Error in submitFormRepository: ' + error.message);
	}
  };

export const updateShopkeeperProfileRepository = async (
  phoneNumber,
  shopkeeperName,
  pincode,
  shopState,
  city,
  address,
  salesAssociateNumber,
  selectedCategory
) => {
  try {
    const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);

    const result = await shopkeeperRepo.update(
      { phoneNumber },
      {
        shopkeeperName,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory
      }
    );
    return result.affected > 0;
  } catch (error) {
    throw new Error('Error in updateShopkeeperProfileRepository: ' + error.message);
  }
};

export const checkSalesAssociateRepository = async (number) => {
	try {
	  const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
  
	  const result = await salesExecutiveRepo
		.createQueryBuilder('salesExecutive')
		.where('salesExecutive.phoneNumber = :number', { number })
		.getCount();
  
	  return result > 0;
	} catch (error) {
	  throw new Error('Error in checkSalesAssociateRepository: ' + error.message);
	}
  };

  export const getCommissionByLevelRepository = async (level) => {
	try {
	  const commissionRepository = AppDataSource.getRepository(Commission);
  
	  const result = await commissionRepository
		.createQueryBuilder('commission')
		.select('commission.commission_amount', 'commissionAmount')
		.where('commission.level = :level', { level })
		.getRawOne();
  
	  return result ? result.commissionAmount : null;
	} catch (error) {
	  throw new Error('Error in getCommissionByLevelRepository: ' + error.message);
	}
  };

  export const getUserLevelRepository = async (mobileNumber) => {
    try {
      const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
      const result = await salesExecutiveRepo
        .createQueryBuilder('salesExecutive')
        .select('salesExecutive.level', 'level')
        .where('salesExecutive.phoneNumber = :mobileNumber', { mobileNumber })
        .getRawOne();
		console.log(result, "---")
		if (result) {
			return result.level;
		} else {
			return false;
		}
    //   return result ? result.level : null;
    } catch (error) {
      throw new Error('Error in getUserLevelRepository: ' + error.message);
    }
  };