import { Router } from 'express';
import { listNutritionists } from '../controllers/nutritionistController';
const router = Router();
router.get('/', listNutritionists);
export default router;
