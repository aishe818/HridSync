import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hridsync';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (err) {
    console.error('MongoDB Atlas connection error:', err);
    process.exit(1);
  }
};
