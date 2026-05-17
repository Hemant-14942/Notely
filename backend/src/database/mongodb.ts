import mongoose from "mongoose";
import { env } from "../config/env.js";

export const connectMongoDB = async (): Promise<void> => {
  if (!env.mongoUri) {
    console.warn("MONGODB_URI is empty. Add it in backend/.env before using database features.");
    return;
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
};
