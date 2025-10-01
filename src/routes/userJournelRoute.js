import express from 'express'
import {
    createUserJournel
} from '../controllers/userJournelController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate, errors } from 'celebrate'
import { upload } from '../helper/multer.js'
const router = express.Router()


router.post(
    '/createUserInput',
    protect,
    upload.array("contentAttachments", 10), // 10 = max file count (change as needed)
    createUserJournel
  )

router.use(errors())

export default router
