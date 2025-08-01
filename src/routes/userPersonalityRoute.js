import express from 'express'
import { createUserPersonality } from '../controllers/userPersonalityController.js'
import { commonPayload } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
const router = express.Router()

router.post('/userPersonality', celebrate(commonPayload), protect, createUserPersonality)

export default router
