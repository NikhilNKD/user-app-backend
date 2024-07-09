import axios from 'axios';
import {saveOtp, findOtpByPhoneNumber, removeOtp} from '../repositories/otpRepository.js'

export const generateOtp = async (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60000); 

  await axios.post('https://www.smsgatewayhub.com/api/mt/SendSMS', {
    APIKey: process.env.SMS_API_KEY,
    senderid: process.env.SMS_SENDER_ID,
    channel: '2',
    DCS: '0',
    flashsms: '0',
    number: phoneNumber,
    text: `Your OTP is ${otp}`,
    route: '1'
  });

  await saveOtp({ phoneNumber, otp, otpExpiry });
  return { message: 'OTP sent successfully' };
};

export const validateOtp = async (phoneNumber, otp) => {
//   const savedOtp = await findOtpByPhoneNumber(phoneNumber);

//   if (!savedOtp || savedOtp.otp !== otp || new Date() > savedOtp.otpExpiry) {
//     throw new Error('Invalid or expired OTP');
//   }

//   await removeOtp(savedOtp);

//   let user = await findUserByPhoneNumber(phoneNumber);
//   if (!user) {
//     user = await saveUser({ phoneNumber });
//   }

//   const token = jwt.sign({ userId: user.id }, 'YOUR_JWT_SECRET', { expiresIn: '1h' });

//   return { message: user.id ? 'Sign in successful' : 'Sign up successful', token };
};

