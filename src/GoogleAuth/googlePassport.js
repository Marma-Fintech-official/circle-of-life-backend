import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import { getUniqueReferId } from "../utils/generateReferrals.js";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const userData = {
            authType: profile.provider,
            googleId: profile.id,
            userName: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            profilePic: profile.photos?.[0]?.value || "",
            referId: await getUniqueReferId(User),
          };
          user = await User.create(userData);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// These are optional if you're using sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
