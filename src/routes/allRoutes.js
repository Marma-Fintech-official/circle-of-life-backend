import express from "express";
const router = express.Router();
import authRoutes from "./authRoute.js"; 
import userPersonalityRoute from "./userPersonalityRoute.js";

router.use("/auth", authRoutes);
router.use("/api", userPersonalityRoute);

export default router;
