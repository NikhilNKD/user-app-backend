import { findUserByPhoneNumber, saveUser, checkPhoneNumberInDatabases } from '../repositories/authRepository.js';

export const loginService = async (phoneNumber, userType) => {
    const user = await findUserByPhoneNumber(phoneNumber, userType);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const registerService = async (userData) => {
    const user = await saveUser(userData);
    return user;
};

export const checkPhoneNumberService = async (phoneNumber) => {
    try {
        return await checkPhoneNumberInDatabases(phoneNumber);
    } catch (error) {
        throw new Error('Error in checkPhoneNumberService: ' + error.message);
    }
};