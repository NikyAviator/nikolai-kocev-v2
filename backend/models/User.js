// Read about timestamps in Mongoose: https://mongoosejs.com/docs/timestamps.html
import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../config/bcrypt.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'A User must have a name!'] },
    email: {
      type: String,
      required: [true, 'A User must have an email!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A User must have a password!'],
    },
    role: { type: String, enum: ['author', 'admin'], default: 'author' },
  },
  { timestamps: true }
);

// Hashes the password before saving
// This will run on:
// User.create()
// doc.save()

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre hook that hashes the password before updating
// will run on:
// User.findOneAndUpdate()
// User. findByIdAndUpdate() å deras alias
// User. findOneAndReplace()

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const update = this.getUpdate() || {};

    // look for password in the update object
    const targets = [update, update.$set, update.$setOnInsert].filter(Boolean);

    for (const target of targets) {
      const targetPassword = target.password;
      if (typeof targetPassword === 'string' && targetPassword.length > 0) {
        const looksLikeHashed = /^\$2[aby]\$\d{2}\$/.test(targetPassword);
        if (!looksLikeHashed) {
          target.password = await hashPassword(targetPassword);
        }
      }
    }

    this.setUpdate(update);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
