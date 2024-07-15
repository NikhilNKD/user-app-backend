import { findUserByPhoneNumber, saveUser, checkPhoneNumberInDatabases } from '../repositories/authRepository.js';

 
import { Category } from '../entities/Category.js';

export const loginService = async (phoneNumber, userType) => {
    const user = await findUserByPhoneNumber(phoneNumber, userType);
    if (!user) {
        throw new Error('User not found');
    }

    if (userType === 'shopkeeper') {
        const selectedCategory = user.selectedCategory;

        // Fetch category details
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOneBy({ name: selectedCategory });

        if (!category) {
            throw new Error('Category not found');
        }

        const shopkeeperType = category.type;

        return { phoneNumber, userType, shopkeeperType, selectedCategory };
    }

    return { phoneNumber, userType };
};

export const registerService = async (userData) => {
    try {
        const user = await saveUser(userData);
        return user;
    } catch (error) {
        throw new Error('Error in registerService: ' + error.message);
    }
};
export const checkPhoneNumberService = async (phoneNumber) => {
    try {
        return await checkPhoneNumberInDatabases(phoneNumber);
    } catch (error) {
        throw new Error('Error in checkPhoneNumberService: ' + error.message);
    }
};