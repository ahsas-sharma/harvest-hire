import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

import "../../config/passport.js";
dotenv.config();
import CONFIG from "../../config/config.js";
const JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY;

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/profile", (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    res.json({ message: "Protected resource", user: decoded, token: token });
  });
});

export default router;
