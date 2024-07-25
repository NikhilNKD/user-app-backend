// src/services/salesExecutiveService.js

import { checkUserRepository,submitFormRepository,getShopkeeperRepo, getSalesExecutiveRepos, getCommissionRepo, getTblCommissionRepo  } from '../repositories/salesExecutiveRepository.js';

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

  export const registerSalesService = async (shopkeeperData) => {
    try {

      if(shopkeeperData && shopkeeperData.salesAssociateNumber){
        const salesAssociateRepo = await getSalesExecutiveRepos()
        const salesAssociate = await salesAssociateRepo.findOne({ where: { mobileNo: shopkeeperData.salesAssociateNumber } });
        if(!salesAssociate) throw new Error('No such SalesAssociate');
      }
      const shopkeeperRepo = await getShopkeeperRepo()
      const shopkeeper = shopkeeperRepo.create(shopkeeperData);
      await shopkeeperRepo.save(shopkeeper);
  
      await checkAndAssignCommission(shopkeeperData.salesAssociateNumber);
    } catch (error) {
      console.log("Error in registerSalesService", error.message)
      throw new Error('Error in registerSalesService: ' + error.message);
    }
  };

  export const checkAndAssignCommission = async (salesAssociateNumber) => {
    console.log('Checking and assigning commission for sales associate:', salesAssociateNumber);

    if (!salesAssociateNumber) {
        console.log('No sales associate number provided, skipping commission assignment.');
        return;
    }

    try {
        const salesAssociateRepo = await getSalesExecutiveRepos()
        const salesAssociate = await salesAssociateRepo.findOne({ where: { mobileNo: salesAssociateNumber } });
        if (!salesAssociate) {
            console.warn(`Sales associate number ${salesAssociateNumber} is not valid, no commission assigned.`);
            return { error: `Sales associate number ${salesAssociateNumber} is not valid, no commission assigned.` };
        }

        let addedBy = salesAssociate.addedBy;

        // Fetch commission rates from the database
        const commissionRates = await fetchCommissionRates();

        // Assign commission to the sales associate
        const commissionAmountBase = commissionRates['Base'];
        await assignCommission(salesAssociateNumber, 'Base', commissionAmountBase);

        // If the sales associate was added by someone, assign additional commission
        if (addedBy) {
            const commissionAmountL1 = commissionRates['L1'];
            await assignCommission(addedBy, 'L1', commissionAmountL1);

            // Check if the person who added the sales associate was also added by someone
            const addedBySalesAssociate = await salesAssociateRepo.findOne({ where: { mobileNo: addedBy } });

            if (addedBySalesAssociate && addedBySalesAssociate.addedBy) {
                const commissionAmountL2 = commissionRates['L2'];
                await assignCommission(addedBySalesAssociate.addedBy, 'L2', commissionAmountL2);
            } else {
                console.warn(`No further addedBy found for ${addedBy}, skipping L2 commission assignment.`);
            }
        }
    } catch (error) {
        console.error('Error assigning commission:', error);
        throw new Error('Error assigning commission');
    }
};

const assignCommission = async (mobileNumber, commissionType, commissionAmount) => {
    console.log('Assigning commission for:', mobileNumber, commissionType, commissionAmount);

    if (!mobileNumber) {
        throw new Error('mobileNumber is null or undefined');
    }

    try {
        const commissionRepo = await getTblCommissionRepo(); // Assume you have a Commission entity
        const existingCommission = await commissionRepo.findOne({ where: { mobileNumber, commissionType } });

        if (existingCommission) {
            existingCommission.amount = parseFloat(commissionAmount).toFixed(2);
            await commissionRepo.save(existingCommission);
        } else {
            const newCommission = commissionRepo.create({
                mobileNumber,
                commissionType,
                amount: parseFloat(commissionAmount).toFixed(2),
            });
            await commissionRepo.save(newCommission);
        }
    } catch (error) {
        console.error('Error assigning commission:', error);
        throw new Error('Error assigning commission');
    }
};
  
//function to fetch commissionRates form the comission_rates table
export const fetchCommissionRates = async () => {
  try {
    // Get repository for the Commission entity
    const commissionRepo = await getCommissionRepo();
    
    // Fetch all records from the commission_rates table
    const commissions = await commissionRepo.find();
    // Transform the result into an object with level as keys
    const commissionRates = commissions.reduce((acc, cur) => {
      acc[cur.level] = cur.commission_amount;
      return acc;
    
    }, {});

    return commissionRates;
  } catch (error) {
    console.error('Error fetching commission rates:', error);
    throw new Error('Error fetching commission rates');
  }
};
