import mongoose from "mongoose";
const DB_CONNECT_URL = process.env.DB_CONNECT_URL;

export const connectToMongoDb = () => {
  try {
    const connect = mongoose.connect(DB_CONNECT_URL);
    if (connect) {
      console.log("Database conected");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
