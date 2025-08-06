// backend/routes/blogRoutes.js
import * as blogController from '../../../controllers/blogController.js'; // ★ use * or named import
import express from 'express';
const router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlogById)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

export default router;
