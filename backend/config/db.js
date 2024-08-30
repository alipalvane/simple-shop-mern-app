import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to Datebase Successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // code=1 means exit qwith failure and code=0 means success
  }
};
