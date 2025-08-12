import express from 'express'
import { protect } from '../helper/protect.js'
import { addUserEntry } from '../controllers/userEntryController.js'
import { celebrate, errors } from 'celebrate'
const router = express.Router()

router.post(
  '/addUserEntry',protect,
  addUserEntry
);

router.use(errors());

export default router;
