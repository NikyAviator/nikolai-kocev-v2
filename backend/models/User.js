// Read about timestamps in Mongoose: https://mongoosejs.com/docs/timestamps.html
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // <- hash later
    role: { type: String, enum: ['author', 'admin'], default: 'author' },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
