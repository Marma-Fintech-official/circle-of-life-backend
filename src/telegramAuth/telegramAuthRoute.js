import express from "express";
import { handleTelegramAuth } from "./telegramPassport.js";

const router = express.Router();

router.post("/telegramLogin", async (req, res) => {
  try {
    const { user, token } = await handleTelegramAuth(req.body);
    res.json({
      user,
      jwtToken: token,
    });
  } catch (error) {
    res.status(500).json({
        message: "Something went wrong",
      });
      next(error);
  }
});

export default router;
