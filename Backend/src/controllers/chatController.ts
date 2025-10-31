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
    res.json({ success: true, data: { reply } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Chat error' });
  }
};

export const startNutritionistChat = async (req: Request, res: Response) => {
  try {
    const { nutritionistId } = req.body;
    const userId = (req as any).user?.id || req.body.userId;
    let session = await ChatSession.findOne({ user: userId, nutritionist: nutritionistId, isWithNutritionist: true });
    if (!session) session = await ChatSession.create({ user: userId, nutritionist: nutritionistId, isWithNutritionist: true });
    res.json({ success: true, data: { sessionId: session._id } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Start nutritionist chat failed' });
  }
};

export const startChatSession = async (req: Request, res: Response) => {
  try {
    const { userId, nutritionistId } = req.body;
    let session = await ChatSession.findOne({ user: userId, nutritionist: nutritionistId });
    if (!session) session = await ChatSession.create({ user: userId, nutritionist: nutritionistId });
    res.json({ success: true, sessionId: session._id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Start chat session failed' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const messages = await ChatMessage.find({ session: sessionId }).sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Get messages failed' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { sender, text } = req.body;

    const message = await ChatMessage.create({ session: sessionId, sender, text });

    // Emit to Socket.IO room
    const io = req.app.get('io');
    if (io) {
      io.to(sessionId).emit('message', message);
    }

    res.json({ success: true, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Send message failed' });
  }
};
