import express from 'express'
import { createUserPersonality,getUserPersonalityDetails,userPersonalityQuestions,createPersonalityQuestions } from '../controllers/userPersonalityController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate,errors } from 'celebrate'
const router = express.Router()


router.post('/userPersonality',protect, createUserPersonality)

router.get('/userPersonalityDetails', protect, getUserPersonalityDetails)

router.post('/createPersonalityQuestions', createPersonalityQuestions)

router.get('/userPersonalityQuestions', userPersonalityQuestions)

router.use(errors());

export default router;
