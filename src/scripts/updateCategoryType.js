// src/scripts/updateCategoryTypes.js

import dotenv from 'dotenv';
import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';

dotenv.config(); // Load environment variables from .env file

const updateCategoryTypes = async () => {
  try {
    console.log('Initializing the database connection...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const repository = AppDataSource.getRepository(Category);

    // Define the updates for each category
    const updates = [
      { id: 1, type: 'product' },
      { id: 2, type: 'product' },
      { id: 3, type: 'product' },
      { id: 4, type: 'product' },
      { id: 5, type: 'service' },
    ];

    for (const update of updates) {
      await repository.update(update.id, { type: update.type });
      console.log(`Updated category with id ${update.id} to type ${update.type}`);
    }

    // Verify the updates
    const updatedCategories = await repository.find();
    console.log('Updated categories:', updatedCategories);
  } catch (error) {
    console.error('Error updating categories in the database:', error.message);
  } finally {
    console.log('Closing the database connection...');
    await AppDataSource.destroy();
  }
};

updateCategoryTypes();
