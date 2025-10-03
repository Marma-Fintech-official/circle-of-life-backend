import express from 'express'
import {
    createUserJournal,
    updateUserProfile,
    getUserJournals,
    discardUserInput
} from '../controllers/userJournalController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate, errors } from 'celebrate'
import { upload } from '../helper/multer.js'
const router = express.Router()


router.post(
    '/createUserInput',
    protect,
    upload.array("contentAttachments", 10), // 10 = max file count (change as needed)
    createUserJournal
  )

  router.put(
    '/updateUserInput/:id', 
    protect, 
    upload.array("contentAttachments", 10), 
    updateUserProfile
  );

  router.get(
    '/getUserInputs',
    protect,
    getUserJournals
  );

  router.delete('/deleteUserInput', protect, discardUserInput)

router.use(errors())

export default router
