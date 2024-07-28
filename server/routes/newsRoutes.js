import { Router } from 'express'
import { generateDailyNews } from '../controllers/newsControllers.js';

const router = Router();

router.post('/daily', generateDailyNews);

export default router