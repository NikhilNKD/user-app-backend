import dotenv from 'dotenv';
import { AppDataSource } from '../config/data-source.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';
import { Category } from '../entities/Category.js';

dotenv.config(); // Load environment variables from .env file

const addSubCategories = async () => {
    try {
        console.log('Initializing the database connection...');
        await AppDataSource.initialize();
        console.log('Database connected successfully');

        // Get the repository for the Category entity to find the category by ID
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOneBy({ id: 5 });  // Find the category with ID 5

        if (!category) {
            throw new Error('Category with ID 5 does not exist');
        }

        // Define the sub-categories with the associated category
        const subCategories = [
            { category, name: 'Men' },
            { category, name: 'Women' },
            { category, name: 'Unisex' }
        ];

        // Get the repository for the TblSalonSubcategory entity
        const subcategoryRepository = AppDataSource.getRepository(TblSalonSubcategory);

        // Save the sub-categories to the database
        await subcategoryRepository.save(subCategories);

        console.log('Sub-categories added successfully');
    } catch (error) {
        console.error('Error adding sub-categories:', error.message);
    } finally {
        console.log('Closing the database connection...');
        await AppDataSource.destroy();
    }
};

addSubCategories().catch(console.error);
