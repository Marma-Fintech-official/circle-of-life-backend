import express from 'express'
import { createUserPersonality,getUserPersonalityDetails,userPersonalityQuestions,createPersonalityQuestions } from '../controllers/userPersonalityController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate,errors } from 'celebrate'
import { upload } from "../helper/multer.js";
const router = express.Router()


router.post('/userPersonality',protect, createUserPersonality)

router.get('/userPersonalityDetails', protect, getUserPersonalityDetails)

router.post('/createPersonalityQuestions',  upload.single("titleLogo"), createPersonalityQuestions)

router.get('/userPersonalityQuestions', userPersonalityQuestions)

router.use(errors());

export default router;
