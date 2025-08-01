const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

//) Global middleware
app.use(morgan('dev')); // Logging middleware

// ) Enable CORS for *ALL* origins (DEVELOPMENT ONLY)
app.use(cors());

// ) Parse JSON bodies
app.use(express.json());

// Connect to the database
app.use(connectDB());

// )  ROUTER HERE
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

// ) Health check endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Hello my little gopher!',
    app: 'nikolai-kocev-v2',
    version: '1.0.0',
  });
});

module.exports = app;
