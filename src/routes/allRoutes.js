import express from "express";
const router = express.Router();
import authRoutes from "./authRoute.js"; // ✅ Works now

// router.use("/api", require("./userPersonalityRoute.js"));
router.use("/auth", authRoutes);

export default router;
