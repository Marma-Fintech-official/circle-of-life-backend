import express from "express";
import {
  addReferral,
  signOut
} from "../controllers/userProfileController.js";
import { payloadValidation } from "../helper/playloadValidation.js";
import { protect } from "../helper/protect.js";
import { celebrate, errors } from "celebrate";
const router = express.Router();



router.post("/referral", protect, addReferral);

router.get("/logout", signOut);

router.use(errors());

export default router;
