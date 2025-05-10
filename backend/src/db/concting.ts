import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const URL = "mongodb://127.0.0.1:27017/FlameSence";

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
