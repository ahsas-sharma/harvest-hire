import { asyncHandler } from "../../utils/asyncHandler.js";
import Order from "../../models/order.model.js";

// return by userId if user is not admin
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    if (req.payload.role === "admin") {
      const orders = await Order.find();
      res.status(200).json(orders);
    } else {
      const orders = await Order.find({ userId: req.payload.userId });
      if (orders.length > 0) {
        return res.status(200).json(orders);
      } else {
        return res.status(404).json({ message: "No orders found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
