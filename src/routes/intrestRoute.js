import express from 'express'
import { upload, handleUploadError } from '../helper/multer.js' // your multer file
import {
  createInterest,
  getAllInterests
} from '../controllers/intrestController.js'
import { celebrate, errors } from 'celebrate'

const router = express.Router()

router.post(
  '/addintrest',
  upload.single('logo'),
  handleUploadError, // your custom multer error handler
  createInterest
)

router.get('/getAllInterests', getAllInterests)

router.use(errors())
export default router
