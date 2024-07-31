import axios from 'axios';
import {
  saveOtp,
  findOtpByPhoneNumber,
  removeOtp,
} from '../repositories/otpRepository.js';
import {
  findUserByPhoneNumber,
  saveUser,
} from '../repositories/authRepository.js';
import jwt from 'jsonwebtoken';
import { BadRequestError, CustomError, InternalServerError, NotFoundError } from '../utils/errorHandlers.js';

export const generateOtp = async (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60000);
  const currentTime = Date.now();

  // Check if OTP was recently sent for this phoneNumber
  const lastOtpRequest = await findOtpByPhoneNumber(phoneNumber); 
  if(lastOtpRequest){
    const timeSinceLastOtp = currentTime - (new Date(lastOtpRequest.otpExpiry).getTime() - (9 * 60000));
    const recentOtpThreshold = 0; // 1 minute in milliseconds
    if (timeSinceLastOtp < recentOtpThreshold) {
      throw new BadRequestError('OTP already sent recently. Please wait before requesting another OTP.')
    }
    await removeOtp(lastOtpRequest); 
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=${process.env.SMS_API_KEY}&senderid=${process.env.SMS_SENDER_ID}&channel=OTP&DCS=0&flashsms=0&number=${phoneNumber}&text=Dear User, Your OTP for login to Near Ki Dukan application is ${otp}. Valid for 30 minutes. Please do not share this OTP. Regards, NKD India Team&route=1&EntityId=${process.env.ENTITY_ID}&dlttemplateid=${process.env.DLT_TEMPLATE_ID}`,
    headers: {},
  };

  const result = await axios
    .request(config)
    .then(async (response) => {
      const messageData = response.data;
      if (
        messageData.ErrorCode === '000' &&
        messageData.ErrorMessage === 'Success'
      ) {
        await saveOtp({ phoneNumber, otp, otpExpiry });
        return { status: 'success', message: 'OTP sent successfully' };
      } else {
        throw new CustomError(messageData.ErrorMessage || "something went wrong",messageData.ErrorCode)
      }
    })
    .catch((error) => {
      throw error
    });
    return result
};

export const validateOtp = async (phoneNumber, otp) => {
  try {
    const savedOtp = await findOtpByPhoneNumber(phoneNumber);

    if (!savedOtp || savedOtp.otp !== otp || new Date() > savedOtp.otpExpiry) {
      if (savedOtp && new Date() > savedOtp.otpExpiry) {
        await removeOtp(savedOtp); // Remove expired OTP
        throw new BadRequestError("Otp expired");
      }
      throw new NotFoundError("Invalid or expired OTP");
    }
    // await removeOtp(savedOtp);
    let user = await findUserByPhoneNumber(phoneNumber);
    let message;
    if (!user) {
      user = await saveUser({ phoneNumber });
      message = 'Sign up successful';
    } else {
      message = 'Sign in successful';
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { message, token, phoneNumber: user.phoneNumber};
  } catch (error) {
    throw error
  }
};
