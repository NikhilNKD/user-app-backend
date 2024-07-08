import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';
import { AppDataSource } from '../config/data-source.js';

export const searchServices = async (req, res) => {
  try {
    const { query } = req.query;

    const services = await AppDataSource.getRepository(TblSalonMainServices)
      .createQueryBuilder('service')
      .where('service.name LIKE :query OR service.description LIKE :query', { query: `%${query}%` })
      .getMany();

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
