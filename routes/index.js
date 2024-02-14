import { verifyToken } from '../utils/auth.js';
import { registerUser, loginUser, updateUser } from '../controllers/userController.js';
import { pay, webhook} from '../controllers/paymentController.js';
import express from 'express';
const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.put('/user', verifyToken, updateUser);

router.post('/checkout/pay', verifyToken, pay);
router.post('/verifypayment/webhook', webhook);


router.all('*', (req, res, next) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
});

export default router;