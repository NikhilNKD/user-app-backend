import { Router } from 'express';
import { generateOtpController, validateOtpController } from '../../controllers/otpController.js';

const router = Router();

router.post('/generate-otp', generateOtpController);
router.post('/validate-otp', validateOtpController);

router.get('/', (req, res) => {
    res.json({
      message: 'Hi from v1 otp from inside',
    });
  });
  

export default router;
