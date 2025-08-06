import express from "express";
const router = express.Router();
import authRoutes from "./authRoute.js";
import userPersonalityRoute from "./userPersonalityRoute.js";
import socialAuthRoute from "../GoogleAuth/socialAuthRoute.js";

router.use("/api", authRoutes);
router.use("/api", userPersonalityRoute);
router.use("/auth", socialAuthRoute);

export default router;
