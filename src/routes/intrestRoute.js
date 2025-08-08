import express from "express";
import { upload, handleUploadError } from "../helper/multer.js"; // your multer file
import {
  createInterest,
  getAllInterests,
} from "../controllers/intrestController.js";

const router = express.Router();

router.post(
  "/addintrest",
  upload.single("logo"),
  handleUploadError, // your custom multer error handler
  createInterest
);

router.get("/getAllInterests", getAllInterests);


export default router;
