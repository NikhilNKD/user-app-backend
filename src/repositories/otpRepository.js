import { AppDataSource } from '../config/data-source.js';
import {Otp} from '../entities/Otp.js';

export const saveOtp = async (otpData) => {
  const repository = AppDataSource.getRepository(Otp);
  return await repository.save(otpData);
};

export const findOtpByPhoneNumber = async (phoneNumber) => {
  const repository = AppDataSource.getRepository(Otp);
  return await repository.findOne({ phoneNumber });
};

export const removeOtp = async (otpData) => {
  const repository = AppDataSource.getRepository(Otp);
  return await repository.remove(otpData);
};

