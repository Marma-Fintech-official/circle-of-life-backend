import express from "express";
import {
  signup,
  login,
  personalDetails,
  addReferral,
} from "../controllers/authController.js";
import { payloadValidation } from "../helper/playloadValidation.js";
import { protect } from "../helper/protect.js";
import { celebrate, errors } from "celebrate";
import { upload } from "../helper/multer.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/personalDetails",
  upload.single("profilePic"),
  protect,
  personalDetails
);

router.post("/referral", protect, addReferral);

router.use(errors());

export default router;
