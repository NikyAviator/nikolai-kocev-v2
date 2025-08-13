// backend/config/seedBlog.js
// Seeds an admin + demo posts. Use --reset to DROP ONLY (no reseed).

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import blogs from './dummyDataBlogs.js';
// Load backend/ .env file no matter where the script is run from
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const RESET = process.argv.includes('--reset');

// Connect to MongoDB
const connectToDB = async () => {
  const uriDB = process.env.MONGO_URI;
  if (!uriDB) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1);
  }
  try {
    await mongoose.connect(uriDB);
    console.log(`✅ Connected to "${mongoose.connection.name}"`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

try {
  // Always connect to the DB first
  await connectToDB();

  if (RESET) {
    // Drop the DB and EXIT (no reseed)
    console.log('⚠️  Dropping database:', mongoose.connection.name);
    await mongoose.connection.db.dropDatabase();
    console.log('🧹 Database dropped. Exiting without reseeding. 😶‍🌫️');
    await mongoose.disconnect();
    process.exit(0);
  }
} catch (error) {
  console.error('❌ Error during initial setup:', error.message);
  await mongoose.disconnect();
  process.exit(1);
}

// Seed the admin
try {
  const admin = await User.create({
    name: 'Niky Kocev',
    email: 'testemail@gmail.com',
    password: 'testpassword', // TODO: hash in real code
    role: 'admin',
  });
  console.log('Admin user created:', admin.name);
} catch (e) {
  if (e.code === 11000) {
    console.log('Admin user already exists, skipping.');
  } else {
    throw e;
  }
}

// Seed the blog posts
try {
  await Blog.deleteMany({}); // optional: clear existing posts without dropping DB
  await Blog.insertMany(blogs);
  console.log('📝 Blog posts seeded:', docs.length);
} catch (error) {
  console.error('❌ Error seeding blog posts:', error.message);
  process.exit(1); // Exit with error
} finally {
  await mongoose.disconnect(); // Disconnect from MongoDB
  console.log('✅ Disconnected from MongoDB');
  process.exit(0); // Exit process with success
}
