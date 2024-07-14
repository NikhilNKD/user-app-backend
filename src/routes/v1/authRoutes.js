import { Router } from 'express';
import { loginController, registerController, checkPhoneNumberController } from '../../controllers/authController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hi from v1 auth from inside'
    });
});
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/check-phone-number', checkPhoneNumberController);

export default router;
