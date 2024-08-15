import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema(
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
      enum: [
        "InCart",
        "Requested",
        "Accepted",
        "Rejected",
        "Returned",
        "Overdue",
      ],
      default: "InCart",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
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

const Request = mongoose.model("Request", requestSchema, "requests");
export default Request;
