import express from "express";
const router = express.Router();
import authRoutes from "./authRoute.js";
import userPersonalityRoute from "./userPersonalityRoute.js";
import socialAuthRoute from "../GoogleAuth/socialAuthRoute.js";
import intrestRoute from "./intrestRoute.js";
router.use("/api", authRoutes);
router.use("/api", userPersonalityRoute);
router.use("/api", socialAuthRoute);
router.use("/api", intrestRoute);

export default router;
