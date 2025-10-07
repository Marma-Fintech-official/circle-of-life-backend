import express from 'express'
const router = express.Router()
import userProfile from './userProfileRoute.js'
import socialAuthRoute from '../GoogleAuth/socialAuthRoute.js'
import xAuthRoute from '../twitterAuth/xAuthRoute.js'
import telegramAuthRoute from '../telegramAuth/telegramAuthRoute.js'
import userJournalRoute from './userJournalRoute.js'
import userWalletRoute from './userWalletRoute.js'

router.use('/api', userProfile)
router.use('/api', socialAuthRoute)
router.use('/api', xAuthRoute)
router.use('/api', telegramAuthRoute)
router.use('/api', userJournalRoute)
router.use('/api', userWalletRoute)

export default router
