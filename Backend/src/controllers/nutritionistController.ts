import { Request, Response } from 'express';
import Nutritionist from '../models/Nutritionist';
export const listNutritionists = async (req: Request, res: Response) => {
  const list = await Nutritionist.find().populate('user', 'name email');
  res.json({ success:true, data:list });
};
