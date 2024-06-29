import { Router } from "express";
import { createUser, getUser, userExists } from "../controllers/userControllers.js";

const router = Router()

router.post('/create', createUser)
router.get('/get/:clerkId', getUser)
router.get('/exists/:clerkId', userExists)

export default router