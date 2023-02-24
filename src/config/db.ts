import mongoose from "mongoose";
const config = require("./config");

export const connectDB = async () => {
  console.log("Attempting DB connection");
  try {
    const conn = await mongoose.connect(config.mongoose.url!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Db connection error", error);
  }
};
