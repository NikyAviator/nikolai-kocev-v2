// backend/config/seedBlog.js
// Seeds an admin + demo posts. Use --reset to DROP ONLY (no reseed).

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
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
  await Blog.insertMany([
    {
      title: 'How to use search engine optimization to drive sales',
      href: '#',
      description:
        'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
      imageUrl:
        'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
      date: 'Mar 10, 2020',
      datetime: '2020-03-10',
      category: { title: 'Sales', href: '#' },
      author: {
        name: 'Lindsay Walton',
        role: 'Front-end Developer',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      title: 'Improve your customer experience',
      href: '#',
      description:
        'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla eu labore irure incididunt velit cillum quis magna dolore.',
      imageUrl:
        'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
      date: 'Feb 12, 2020',
      datetime: '2020-02-12',
      category: { title: 'Business', href: '#' },
      author: {
        name: 'Tom Cook',
        role: 'Director of Product',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
  ]);
  console.log('Blog posts seeded successfully!');
} catch (error) {
  console.error('❌ Error seeding blog posts:', error.message);
  process.exit(1); // Exit with error
} finally {
  await mongoose.disconnect(); // Disconnect from MongoDB
  console.log('✅ Disconnected from MongoDB');
  process.exit(0); // Exit process with success
}
