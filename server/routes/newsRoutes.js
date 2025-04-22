import { Router } from "express";
import {
  generateDailyNews,
  getLimelightResponse,
} from "../controllers/newsControllers.js";

const router = Router();

router.post("/daily", generateDailyNews);
router.post("/limelight", getLimelightResponse);

export default router;
