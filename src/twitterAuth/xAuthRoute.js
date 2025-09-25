import express from "express";
import passport from "passport";
import { COOKIE_OPTIONS } from "../helper/cookie.js";
import { createToken } from "../helper/jwt.js";
import "./xPassport.js"; // Twitter/X strategy config

const router = express.Router();

// Step 1: Initiates Twitter OAuth flow
router.get(
  "/twitter",
  passport.authenticate("twitter")
);

// Step 2: Handles Twitter OAuth callback
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/failure", // If Twitter login fails
  }),
  async (req, res) => {
    try {
      const payload = {
        id: req.user._id,
        authType: req.user.authType, // should be "twitter" or "x"
      };

      const token = createToken(payload);

      // Save token in cookie
      res.cookie("token", token, COOKIE_OPTIONS);

      // Redirect after successful login
      res.redirect("https://www.wikipedia.org/");
    } catch (error) {
      console.error("Twitter OAuth Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/failure", (req, res) => {
    res.json({ message: "Fail to login" });
  });

export default router;
