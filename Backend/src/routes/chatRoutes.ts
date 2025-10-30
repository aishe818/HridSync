import express from 'express';
import { aiChat, startNutritionistChat, startChatSession, getMessages, sendMessage } from '../controllers/chatController';
import { protect } from '../middleware/auth';
const router = express.Router();

router.post('/ai', protect, aiChat);
router.post('/nutritionist', protect, startNutritionistChat);
router.post('/start', startChatSession); // POST /api/chat/start
router.get('/:sessionId/messages', getMessages); // GET /api/chat/:sessionId/messages
router.post('/:sessionId/message', sendMessage); // POST /api/chat/:sessionId/message

export default router;
