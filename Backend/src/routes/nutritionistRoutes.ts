import express from 'express';
import User from '../models/User';
const router = express.Router();

router.get('/', async (req, res) => {
  const nutritionists = await User.find({ userType: 'doctor' });
  res.json({ nutritionists });
});

export default router;
