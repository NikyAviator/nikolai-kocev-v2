import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImg: { type: String }, // URL to the cover image (maybe use a var and pull pics online)
    category: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    published: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
