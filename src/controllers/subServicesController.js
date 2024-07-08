import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js';
import { AppDataSource } from '../config/data-source.js';

export const getSubServicesByMainServiceId = async (req, res) => {
  try {
    const { mainServiceId } = req.params;

    const subServices = await AppDataSource.getRepository(TblSalonSubSubServices)
      .createQueryBuilder('subService')
      .where('subService.main_service_id = :mainServiceId', { mainServiceId })
      .getMany();

    res.status(200).json(subServices);
  } catch (error) {
    console.error('Error fetching sub-services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
