// ADMIN (POST /, PATCH /:id, DELETE /:id)
import * as blogController from '../../../controllers/blogController.js';
import express from 'express';
const router = express.Router();
// CODE THE REQUIRED AUTH MIDDLEWARE - TODO
import requireAuth from '../../../middleware/requireAuth.js';

// ADD HERE!
router.use(requireAuth); // Middleware to protect routes

router.route('/').post(blogController.createBlog);

router
  .route('/:id')
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

export default router;
