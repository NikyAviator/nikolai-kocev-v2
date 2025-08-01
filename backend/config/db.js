// backend/config/db.js
import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // options are optional on Mongoose 8+
    });
    console.log(`MongoDB → ${conn.connection.host}`);
  } catch (err) {
    console.error('DB connection failed', err);
    process.exit(1);
  }
}
