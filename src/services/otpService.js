import axios from 'axios';
import {saveOtp, findOtpByPhoneNumber, removeOtp} from '../repositories/otpRepository.js'

export const generateOtp = async (phoneNumber) => {
  // Format phone number by removing country code if present
  const formattedPhoneNumber = phoneNumber.replace(/^\+91/, ''); 


  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

  console.log(`Generating OTP ${otp} for ${formattedPhoneNumber}`); // Log OTP generation

  try {
    const response = await axios.post('https://www.smsgatewayhub.com/api/mt/SendSMS', null, {
      params: {
        APIKey: process.env.SMS_API_KEY,
        senderid: process.env.SMS_SENDER_ID,
        channel: '2',
        DCS: '0',
        flashsms: '0',
        number: `91${formattedPhoneNumber}`, // Include country code in the number
        text: `Your OTP is ${otp}`,
        route: '1'
      }
    });

    console.log('SMS Gateway Hub Response:', response.data); // Log SMS Gateway Hub response

    if (response.data.ErrorCode === '000') {
      console.log('OTP sent successfully'); // Log successful OTP sending
    } else {
      console.error('SMS Gateway Hub Error:', response.data.ErrorMessage);
      throw new Error('Failed to send OTP');
    }

    await saveOtp({ phoneNumber: formattedPhoneNumber, otp, otpExpiry });

    // Return a success message
    return { message: 'OTP sent successfully' };
  } catch (error) {
    console.error('SMS API Error:', error);
    throw new Error('Failed to send OTP');
  }
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

