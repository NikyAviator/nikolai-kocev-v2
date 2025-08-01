const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Needs to be hashed!
  role: { type: String, enum: ['author', 'admin'], default: 'author' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
