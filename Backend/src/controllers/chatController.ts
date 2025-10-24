import { Request, Response } from 'express';
import ChatSession from '../models/ChatSession';
import ChatMessage from '../models/ChatMessage';
import { callLLM } from '../services/aiService';
export const aiChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const userId = (req as any).user?.id || req.body.userId;
    let session = await ChatSession.findOne({ user: userId, isWithNutritionist: false });
    if (!session) session = await ChatSession.create({ user: userId, isWithNutritionist: false });
    await ChatMessage.create({ session: session._id, sender: 'user', text: message });
    const reply = await callLLM(`User: ${message} -- give heart-health advice.`);
    await ChatMessage.create({ session: session._id, sender: 'system', text: reply });
    res.json({ success:true, data:{ reply } });
  } catch (err) { console.error(err); res.status(500).json({ success:false, message:'Chat error' }); }
};
export const startNutritionistChat = async (req: Request, res: Response) => {
  try {
    const { nutritionistId } = req.body;
    const userId = (req as any).user?.id || req.body.userId;
    const session = await ChatSession.create({ user: userId, nutritionist: nutritionistId, isWithNutritionist: true });
    res.json({ success:true, data:{ sessionId: session._id } });
  } catch (err) { res.status(500).json({ success:false, message:'Start nutritionist chat failed' }); }
};
