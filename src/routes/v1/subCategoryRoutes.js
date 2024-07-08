// routes/v1/subCategoryRoutes.js
import { Router } from 'express';
import { getSubCategoriesByCategoryIdController } from '../../controllers/subCategoryController.js';

const router = Router();

router.get('/:categoryId', getSubCategoriesByCategoryIdController);

export default router;
