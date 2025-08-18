// backend/config/seedBlog.js
// Seeds an admin + demo posts. Use --reset to DROP ONLY (no reseed).

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import { buildBlogs } from './dummyDataBlogs.js';
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
    process.exit(0); // Exit with success
  }
} catch (error) {
  console.error('❌ Error during initial setup:', error.message);
  await mongoose.disconnect();
  process.exit(1);
}
// --- Seed the admin user ---
// --- ensure admin exists ---
let admin;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Seed the admin
try {
  admin = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    {
      $setOnInsert: {
        name: 'Admin User',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD, // Ensure this is hashed in the User model
        role: 'admin', // Ensure your User model supports roles
      },
    },
    { upsert: true, new: true } // upsert creates if not exists, new returns the updated document
  );

  console.log('👑 Admin created:', admin.email);
} catch (e) {
  console.error('❌ Error creating admin user:', e.message);
  await mongoose.disconnect(); // Disconnect from MongoDB
  process.exit(1); // Exit with error
}
// Sends the admins _id to the buildBlogs function
const blogs = buildBlogs(admin._id);
// Seed the blog posts
try {
  await Blog.deleteMany({});
  const docs = await Blog.insertMany(blogs);
  console.log('📝 Blog posts seeded:', docs.length);
} catch (error) {
  console.error('❌ Error seeding blog posts:', error.message);
  process.exit(1);
} finally {
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
  process.exit(0);
}
