// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRouterPublic from './routes/v1/public/userRoutesPublic.js';
import blogRouterPublic from './routes/v1/public/blogRoutesPublic.js';
import blogRouterAdmin from './routes/v1/admin/blogRoutesAdmin.js';

const app = express();

// global middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routers
app.use('/api/v1/users', userRouterPublic);
app.use('/api/v1/blogs', blogRouterPublic);
app.use('/api/v1/admin/blogs', blogRouterAdmin);

// health-check
app.get('/api/v1/health', (_req, res) =>
  res.status(200).json({
    message: 'Hello my little gopher. Everything is healthy!',
    status: 'OK',
  })
);

export default app;
