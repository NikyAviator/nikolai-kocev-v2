// Read about timestamps in Mongoose: https://mongoosejs.com/docs/timestamps.html
import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../config/bcrypt.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // <- hash later, maybe works now?
    role: { type: String, enum: ['author', 'admin'], default: 'author' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
