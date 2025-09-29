import express from "express";
import { handleTelegramAuth } from "./telegramPassport.js";
import { COOKIE_OPTIONS } from '../helper/cookie.js'
const router = express.Router();

router.post("/telegramLogin", async (req, res) => {
  try {
    const { user, token } = await handleTelegramAuth(req.body);

    res.cookie("token", token.toString(), COOKIE_OPTIONS);
    res.json({
      user,
      jwtToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(error); // now this works
  }
});

export default router;
