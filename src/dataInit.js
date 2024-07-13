// src/dataInit.js

import { AppDataSource } from './config/data-source.js';
import { Category } from './entities/Category.js';

const addInitialCategories = async () => {
    try {
        await AppDataSource.initialize();  // Initialize the data source

        const categoryRepository = AppDataSource.getRepository(Category);
        const existingCategories = await categoryRepository.find();

        if (existingCategories.length === 0) {
            // Add categories only if the table is empty
            const categories = [
                { name: 'Grocery Shop', icon: null, type: 'product' },
                { name: 'Vegetable Shop', icon: null, type: 'product' },
                { name: 'Sweets Shop', icon: null, type: 'product' },
                { name: 'Stationary Shop', icon: null, type: 'product' },
                { name: 'Salon Shop', icon: null, type: 'service' }
            ];

            await categoryRepository.save(categories);
            console.log('Categories have been added.');
        } else {
            console.log('Categories already exist.');
        }
    } catch (error) {
        console.error('Error initializing data:', error);
    } finally {
        await AppDataSource.destroy();  // Ensure the data source is properly closed
    }
};

addInitialCategories();
