import { generateOtp, validateOtp } from '../services/otpService.js';

export const generateOtpController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    await generateOtp(phoneNumber);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Generate OTP Error:', error);
    res.status(500).json({ message: 'An error occurred while generating the OTP', error: error.message });
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
