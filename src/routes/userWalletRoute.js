import express from 'express'
import { getWalletBalance } from '../controllers/userWalletController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate, errors } from 'celebrate'
const router = express.Router()

router.get('/WalletBalance', protect, getWalletBalance)
router.use(errors())
export default router