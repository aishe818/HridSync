import { Request, Response } from 'express';
import HealthAssessment from '../models/HealthAssessment';
import HealthRisk from '../models/HealthRisk';
import { callLLM } from '../services/aiService';
export const createAssessment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || req.body.userId;
    const payload = { user: userId, systolic: req.body.systolic, diastolic: req.body.diastolic, cholesterol: req.body.cholesterol, diabetes: req.body.diabetes, smoker: req.body.smoker, activityLevel: req.body.activityLevel };
    const assessment = await HealthAssessment.create(payload);
    const prompt = `Assess heart disease risk for: ${JSON.stringify(payload)}`;
    const aiReply = await callLLM(prompt);
    const riskLevel = aiReply.toLowerCase().includes('high') ? 'high' : (aiReply.toLowerCase().includes('low') ? 'low' : 'medium');
    const riskScore = Math.random();
    const risk = await HealthRisk.create({ user: userId, assessment: assessment._id, riskScore, riskLevel });
    res.json({ success:true, data:{ assessment, risk, aiReply } });
  } catch (err) { console.error(err); res.status(500).json({ success:false, message:'Assessment error' }); }
};
