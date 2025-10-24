import { Request, Response } from 'express';
import DietPlan from '../models/DietPlan';
const TEMPLATES:any = { low:{title:'Maintenance', description:'Whole grains, vegs, lean protein.'}, medium:{title:'DASH-style', description:'Low sodium, high fiber.'}, high:{title:'Therapeutic', description:'Strict low-sodium, consult doctor.'} };
export const getDietForRisk = async (req: Request, res: Response) => {
  const risk = (req.query.risk as string) || 'medium';
  const db = await DietPlan.findOne({ riskLevel: risk });
  if (db) return res.json({ success:true, data:db });
  res.json({ success:true, data:TEMPLATES[risk] || TEMPLATES['medium'] });
};
