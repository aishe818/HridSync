import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
export interface AuthRequest extends Request { user?: any; }
export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success:false, message:'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ success:false, message:'Token invalid' });
  }
};
