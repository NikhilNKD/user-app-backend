import { generateOtp, validateOtp } from '../services/otpService.js';

export const generateOtpController = async (req, res) => {
  try {
    const { mobile } = req.body;
    const result = await generateOtp(mobile);
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
