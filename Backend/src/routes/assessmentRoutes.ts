import { Router } from 'express';
import { createAssessment } from '../controllers/assessmentController';
import { protect } from '../middleware/auth';
const router = Router();
router.post('/', protect, createAssessment);
export default router;
