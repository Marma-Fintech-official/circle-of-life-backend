import express from 'express'
import {
    createUserJournel,
    updateUserProfile
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

  router.put(
    '/updateUserInput/:id', 
    protect, 
    upload.array("contentAttachments", 10), 
    updateUserProfile
  );

router.use(errors())

export default router
