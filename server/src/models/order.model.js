import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    equipmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Equipment",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Rented", "Overdue", "Returned", "Cancelled"],
      default: "Rented",
      required: true,
    },
    rentDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "orders");
export default Order;
