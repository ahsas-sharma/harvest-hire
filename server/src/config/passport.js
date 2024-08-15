// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";

const JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    // add email in scope
    // check if email exists in database
    // if it does then just return the token
    // else create a new user
    function (accessToken, refreshToken, profile, done) {
      // call generateToken() after creating a user and provide the same payload - userId and role
      // set isEmailVerified to true for user
      console.log(profile.email);
      const token = jwt.sign(
        {
          id: profile.id,
          displayName: profile.displayName,
        },
        JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      done(null, token);
    }
  )
);

passport.serializeUser((token, done) => {
  done(null, token);
});

passport.deserializeUser((token, done) => {
  done(null, token);
});
