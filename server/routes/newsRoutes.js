import { Router } from 'express'
import { generateDailyNews } from '../controllers/newsControllers.js';

const router = Router();

router.get('/daily', generateDailyNews);

export default router