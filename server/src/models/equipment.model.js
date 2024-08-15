import mongoose from "mongoose";
const { Schema } = mongoose;

const equipmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  features: {
    type: [],
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  isAvailable: {
    type: Boolean,
    required: true,
  },

  imageUrl: {
    type: String,
    required: false,
    default:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZsNDMxNzQ1NzEwMTAtcHVibGljLWltYWdlLWtvd3NmZGt1LmpwZw.jpg",
  },
});

const Equipment = mongoose.model("Equipment", equipmentSchema, "equipments");

export default Equipment;
