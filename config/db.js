// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected 🔥🔥');
  } catch (error) {
    console.error('❌ MongoDB connection error', error);
    process.exit(1);
  }
}
