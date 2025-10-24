import { Router } from 'express';
import { getDietForRisk } from '../controllers/dietController';
const router = Router();
router.get('/', getDietForRisk);
export default router;
