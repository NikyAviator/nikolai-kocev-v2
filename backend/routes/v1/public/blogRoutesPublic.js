// PUBLIC GET array of all & single blog posts
import * as blogController from '../../../controllers/blogController.js';
import express from 'express';
const router = express.Router();

router.route('/').get(blogController.getAllBlogs);

router.route('/:id').get(blogController.getBlogById);

export default router;
