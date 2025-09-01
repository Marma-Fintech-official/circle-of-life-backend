import express from 'express'
import { protect } from '../helper/protect.js'
import { addUserEntry,updateUserEntry } from '../controllers/userEntryController.js'
import { celebrate, errors } from 'celebrate'
const router = express.Router()

router.post(
  '/addUserEntry',protect,
  addUserEntry
);

router.put('/updateUserEntry', protect, updateUserEntry)

router.use(errors());

export default router;
