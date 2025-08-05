import express from "express";
import passport from "passport";
import { COOKIE_OPTIONS } from "../helper/cookie.js";
import { createToken } from "../helper/jwt.js";
import "./googlePassport.js";

const router = express.Router();

// Initiates Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handles Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const payload = {
        id: req.user._id,
        authType: req.user.authType,
      };

      const token = await createToken(payload);

      res.cookie("token", token, COOKIE_OPTIONS);
      res.redirect("https://www.wikipedia.org/");
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    next(error);
  }
);

export default router;
