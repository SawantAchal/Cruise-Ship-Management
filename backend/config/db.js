import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
  try {
    // Use the Mongo URI from environment variable
    const mongoURI = process.env.VITE_MONGO_URL; // Accessing via dotenv in Node.js
    if (!mongoURI) {
      console.error('Mongo URI is not defined in the environment variables');
      return;
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(mongoURI);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

