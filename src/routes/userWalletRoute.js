import express from 'express'
import { getWalletBalance,getWalletTransactions,transferCoins} from '../controllers/userWalletController.js'
import { payloadValidation } from '../helper/playloadValidation.js'
import { protect } from '../helper/protect.js'
import { celebrate, errors } from 'celebrate'
const router = express.Router()

router.get('/WalletBalance', protect, getWalletBalance)
router.get('/WalletTransactions', protect, getWalletTransactions)
router.post('/transferFunds', protect, transferCoins)
router.use(errors())
export default router