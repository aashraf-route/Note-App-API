import mongoose from "mongoose";

const DBName = process.env.DB_NAME;
const DBUrl =  process.env.MONGODB_URI;;

export const dbConnectStatus = {
  failed: "failed",
  success: "success",
};

Object.freeze(dbConnectStatus);

export const connectDB = async () => {
  try {
    await mongoose.connect(DBUrl);
    return {
      status: dbConnectStatus.success,
      message: `Connected to the database: ${DBName}`,
    };
  } catch (error) {
    return {
      status: dbConnectStatus.failed,
      message: `Error connecting to the database: ${error.message}`,
    };
  }
};
