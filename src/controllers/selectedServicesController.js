import { TblSelectedServices } from '../entities/TblSelectedServices.js';
import { AppDataSource } from '../config/data-source.js';

export const addSelectedSubServices = async (req, res) => {
  try {
    const { phoneNumber, mainServiceName, subServiceName } = req.body;

    if (!phoneNumber || !mainServiceName || !subServiceName) {
      return res.status(400).json({ message: 'Please provide phoneNumber, mainServiceName, and subServiceName' });
    }

    const selectedService = AppDataSource.getRepository(TblSelectedServices).create({
      phoneNumber,
      mainServiceName,
      subServiceName
    });

    await AppDataSource.getRepository(TblSelectedServices).save(selectedService);

    res.status(200).json({ message: 'Selected sub-services saved successfully' });
  } catch (error) {
    console.error('Error saving selected services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
