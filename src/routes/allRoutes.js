import express from "express";
const router = express.Router();
import authRoutes from "./authRoute.js"; 
import userPersonalityRoute from "./userPersonalityRoute.js";

router.use("/api", authRoutes);
router.use("/api", userPersonalityRoute);

export default router;
