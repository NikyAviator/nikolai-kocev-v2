import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
  published: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Blog', blogSchema);
