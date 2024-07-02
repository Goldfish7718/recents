import { Router } from "express";
import { createUser, getUser } from "../controllers/userControllers.js";

const router = Router()

router.post('/create', createUser)
router.get('/get/:clerkId', getUser)

export default router