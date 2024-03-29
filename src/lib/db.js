"use server";
import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
if (!process.env.NEXTAUTH_URL) {
  throw new Error("No  NEXTAUTH_URL env variable");
}
if (!process.env.MONGODB_URI) {
  throw new Error("No  MONGODB_URI env variable");
}
let cache = { connection: null, promise: null };
export default async function DBconnect() {
  if (cache.connection) {
    return cache.connection;
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(process.env.MONGODB_URI);
  }
  try {
    cache.connection = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
  return cache.connection;
}
