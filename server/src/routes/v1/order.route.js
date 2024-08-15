import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middleware/verifyToken.js";

import { getAllOrders } from "../../controllers/v1/order.controller.js";

// get all orders
router.get("/", authMiddleware, getAllOrders);

export default router;
