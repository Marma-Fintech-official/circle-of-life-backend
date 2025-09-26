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
    session: false, //Login sessions require session support
    failureRedirect: "/login",
  }),
  async (req, res, next) => {
    try {
      const payload = {
        id: req.user._id,
        authType: req.user.authType,
      };

      const token = createToken(payload);

      res.cookie("token", token, COOKIE_OPTIONS);
      res.redirect("https://www.wikipedia.org/");
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/failure", (req, res) => {
  res.json({ message: "Fail to login" });
});

export default router;
