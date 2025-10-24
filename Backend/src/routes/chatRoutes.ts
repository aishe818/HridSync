import { Router } from 'express';
import { aiChat, startNutritionistChat } from '../controllers/chatController';
import { protect } from '../middleware/auth';
const router = Router();
router.post('/ai', protect, aiChat);
router.post('/nutritionist', protect, startNutritionistChat);
export default router;
