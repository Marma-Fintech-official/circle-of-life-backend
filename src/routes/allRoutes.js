import express from "express";
const router = express.Router();
import userProfile from "./userProfileRoute.js";
import socialAuthRoute from "../GoogleAuth/socialAuthRoute.js";
import xAuthRoute from "../twitterAuth/xAuthRoute.js"

router.use("/api", userProfile);
router.use("/api", socialAuthRoute);
router.use("/api", xAuthRoute);

export default router;
