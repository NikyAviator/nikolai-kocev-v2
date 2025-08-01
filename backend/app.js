// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// global middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routers
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

// health-check
app.get('/api', (_req, res) =>
  res.status(200).json({ message: 'Hello my little gopher!', status: 'OK' })
);

export default app;
