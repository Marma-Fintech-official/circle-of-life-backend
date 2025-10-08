import express from 'express'
import {markNotificationRead,markAllNotificationsRead} from '../controllers/userNotificationController';
import { payloadValidation } from '../helper/playloadValidation';
import {protect} from '../helper/protect.js'
import {celebrate,errors} from 'celebrate'
const router = express.Router()

router.put('/readNotification/:id',protect, markNotificationRead)
router.put('/readAllNotifications', protect, markAllNotificationsRead)

router.use(errors())
export default router