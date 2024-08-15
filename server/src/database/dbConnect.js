import mongoose from "mongoose";
import CONFIG from "../config/config.js";
import Equipment from "../models/equipment.model.js";
async function dbconnect() {
  try {
    await mongoose.connect(CONFIG.MONGO_URL);
    console.log("-------------------DB Connected-----------------");
  } catch (error) {
    console.log(error);
  }
}
dbconnect();
