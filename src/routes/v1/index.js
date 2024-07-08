// routes/v1/index.js
import { Router } from 'express';
import authRoutes from './authRoutes.js';
import commissionRoutes from './commissionRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import subCategoryRoutes from './subCategoryRoutes.js';
import customerRoutes from './customerRoutes.js';
import shopRoutes from './shopRoutes.js';
import shopkeeperRoutes from './shopkeeperRoutes.js';
import mainServicesRoutes from './mainServicesRoutes.js';
import servicesRoutes from './servicesRoutes.js';
import subServicesRoutes from './subServicesRoutes.js';
import selectedSubServicesRoutes from './selectedSubServicesRoutes.js';
import searchServicesRoutes from './searchServicesRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/commissions', commissionRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/customers', customerRoutes);
router.use('/shops', shopRoutes);
router.use('/shopkeepers', shopkeeperRoutes); 
router.use('/mainServices', mainServicesRoutes);
router.use('/services', servicesRoutes);
router.use('/subservices', subServicesRoutes);
router.use('/shopkeeper/selectedSubServices', selectedSubServicesRoutes);
router.use('/searchServices', searchServicesRoutes);

export default router;
