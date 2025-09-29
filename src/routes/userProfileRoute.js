import express from "express";
import {
  addReferral,
  signOut,
  updateUserProfile,
  getUserProfile
} from "../controllers/userProfileController.js";
import { payloadValidation } from "../helper/playloadValidation.js";
import { protect } from "../helper/protect.js";
import { celebrate, errors } from "celebrate";
const router = express.Router();

router.put("/editUserProfile", protect, updateUserProfile)
router.get("/profileDetails", protect, getUserProfile)
router.post("/useReferralCode", protect, addReferral);
router.get("/logout", signOut);

router.use(errors());

export default router;
