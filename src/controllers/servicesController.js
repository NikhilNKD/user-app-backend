import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';
import { AppDataSource } from '../config/data-source.js';

export const getServicesBySubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params;

    const mainServices = await AppDataSource.getRepository(TblSalonMainServices)
      .createQueryBuilder('mainService')
      .where('mainService.sub_category_id = :subcategory', { subcategory })
      .getMany();

    res.status(200).json(mainServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
