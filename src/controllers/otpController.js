import { generateOtp, validateOtp } from '../services/otpService.js';

export const generateOtpController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(req.body)
    const result = await generateOtp(phoneNumber);
    res.json(result);
  } catch (error) {
    console.log("Error: ",error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

export const validateOtpController = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const result = await validateOtp(phoneNumber, otp);
      res.json(result);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
