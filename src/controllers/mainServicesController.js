import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';
import { AppDataSource } from '../config/data-source.js';

export const getMainServicesBySubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params;

    const subCategory = await AppDataSource.getRepository(TblSalonSubcategory)
      .createQueryBuilder('subcategory')
      .where('subcategory.name = :name', { name: subcategory })
      .getOne();

    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const mainServices = await AppDataSource.getRepository(TblSalonMainServices)
      .createQueryBuilder('mainService')
      .where('mainService.sub_category_id = :id', { id: subCategory.id })
      .getMany();

    res.status(200).json(mainServices);
  } catch (error) {
    console.error('Error fetching main services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
