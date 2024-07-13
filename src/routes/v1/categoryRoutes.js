// src/routes/v1/categoryRoutes.js
import { Router } from 'express';
import { fetchCategories, fetchSubCategories, createCategories, createSubCategories } from '../../controllers/categoryController.js';

const router = Router();

router.get('/categories', fetchCategories);  // Fetch all categories
router.get('/subcategories/:categoryId', fetchSubCategories);  // Fetch sub-categories for a category
router.post('/categories', createCategories);  // Add new categories
router.post('/subcategories', createSubCategories);  // Add new sub-categories

export default router;



