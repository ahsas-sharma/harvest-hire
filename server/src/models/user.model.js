import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    govtID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    phoneToken: {
      type: String,
      required: false,
      unique: true,
    },
    emailToken: {
      type: String,
      required: false,
      unique: true,
    },
    // TODO: Change default email and phone verificatio to false
    isEmailVerified: {
      type: Boolean,
      default: true,
      required: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: true,
      required: true,
    },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Request",
        default: [],
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Equipment",
        default: [],
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

// (modelName, Schema, collectionName)
const User = mongoose.model("User", userSchema, "users");
export default User;
