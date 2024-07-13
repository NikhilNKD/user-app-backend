import { loginService, registerService, checkPhoneNumberService } from '../services/authService.js';

export const loginController = async (req, res) => {
    try {
        const { phoneNumber, userType } = req.body;
        const result = await loginService(phoneNumber, userType);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const registerController = async (req, res) => {
    try {
        const userData = req.body;
        const result = await registerService(userData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const checkPhoneNumberController = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const result = await checkPhoneNumberService(phoneNumber);
        if (result.message.includes('Phone number already exists')) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in checkPhoneNumberController:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};