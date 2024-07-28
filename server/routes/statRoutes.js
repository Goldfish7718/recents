import { Router } from 'express'
import { getGeneralStats } from '../controllers/statControllers.js'

const router = Router()

router.get('/general', getGeneralStats)

export default router