import mongoose from "mongoose";

export const connectToMongoDb = () => {
  try {
    const connect = mongoose.connect(process.env.DB_CONNECT_URL + "/l-data");
    if (connect) {
      console.log(`Database conected: ${process.env.DB_CONNECT_URL}/l-data`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
