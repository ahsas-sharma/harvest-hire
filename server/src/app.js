import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import equipmentRoutes from "./routes/v1/equipment.route.js";
import userRoutes from "./routes/v1/user.route.js";
import requestRoutes from "./routes/v1/request.route.js";
import orderRoutes from "./routes/v1/order.route.js";
import authRoutes from "./routes/v1/auth.route.js";

const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Google Sign In
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (req, res) => {
  res.send("Working");
});

app.use("/api/equipment", equipmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/api/auth/profile?token=" + req.user);
  }
);

export { app };
