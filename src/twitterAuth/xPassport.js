import passport from "passport";
import { Strategy as TwitterStrategy } from 'passport-twitter-oauth2';
import User from "../models/userModel.js";
import dotenv from "dotenv";
import { getUniqueReferId } from "../utils/generateReferrals.js";
dotenv.config();

passport.use(new TwitterStrategy({
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    scope: ['tweet.read', 'users.read', 'offline.access']
  },
  async (accessToken, refreshToken, profile, done) => {
    
    try {
      let user = await User.findOne({ twitterId: profile.id });
      if (!user) {
        const userData = {
          twitterId: profile.id,
          authType: profile.provider,
          userName: profile.username,
          profilePic: profile.photos[0].value,
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

// serialize/deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
