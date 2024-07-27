import { AppDataSource } from '../config/data-source.js';
import { NewCustomer } from '../entities/NewCustomer.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';

export const findUserByPhoneNumber = async (phoneNumber, userType) => {
    const repository = userType === 'shopkeeper'
        ? AppDataSource.getRepository(Shopkeeper)
        : AppDataSource.getRepository(NewCustomer);
    const user = await repository.findOne({ where: { phoneNumber } });
    console.log(user, "fkdkf;klklk")
    return user;
};
export const saveUser = async (userData) => {
    try {
        const repository = AppDataSource.getRepository(Shopkeeper);
        const user = repository.create(userData);
        await repository.save(user);
        return user;
    } catch (error) {
        console.error('Error in saveUser:', error);
        throw new Error('Error saving user: ' + error.message);
    }
};

export const saveCustomer = async (userData) => {
    try {
        const repository = AppDataSource.getRepository(NewCustomer);
        const customer = repository.create(userData);
        await repository.save(customer);
        return customer;
    } catch (error) {
        console.error('Error in saveCustomer:', error);
        throw new Error('Error saving customer: ' + error.message);
    }
};

export const checkPhoneNumberInDatabases = async (phoneNumber) => {
    const customerRepository = AppDataSource.getRepository(NewCustomer);
    const shopkeeperRepository = AppDataSource.getRepository(Shopkeeper);

    const customer = await customerRepository.findOneBy({ phoneNumber });
    const shopkeeper = await shopkeeperRepository.findOneBy({ phoneNumber });

    if (shopkeeper) {
        return { message: 'Phone number already exists in shopkeepers database' };
    }
    if (customer) {
        return { message: 'Phone number already exists in newcustomers database' };
    }
    return { message: 'Phone number available' };
};
