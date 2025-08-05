import express from 'express'
import { createUserPersonality,getUserPersonalityDetails } from '../controllers/userPersonalityController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate,errors } from 'celebrate'
const router = express.Router()

// router.post('/userPersonality', celebrate(commonPayload), protect, createUserPersonality)

router.post('/userPersonality',protect, createUserPersonality)

router.get('/userPersonalityDetails', protect, getUserPersonalityDetails)

router.use(errors());

export default router;
