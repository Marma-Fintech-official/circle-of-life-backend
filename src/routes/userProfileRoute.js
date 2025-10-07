import express from 'express'
import {
  addReferral,
  signOut,
  updateUserProfile,
  getUserProfile,
  saveFcmToken
} from '../controllers/userProfileController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate, errors } from 'celebrate'
import { upload } from '../helper/multer.js'
const router = express.Router()


router.put('/editUserProfileInfo', upload.single('profilePic'), protect, updateUserProfile)
router.get('/profileDetails', protect, getUserProfile)
router.post('/useReferralCode', protect, addReferral)
router.get('/logout', signOut)
router.post('/getFcmToken', protect, saveFcmToken)

router.use(errors())

export default router
