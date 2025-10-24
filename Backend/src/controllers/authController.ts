import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Check if password meets requirements
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = await User.create({ email, password, name });
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, email: user.email, name: user.name } }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({
      success: true,
      data: { token, user: { id: user._id, email: user.email, name: user.name } }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in'
    });
  }
};
