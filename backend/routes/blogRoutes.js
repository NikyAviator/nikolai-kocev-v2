import userController from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.route('/login').post(userController.loginUser);
router.route('/register').post(userController.registerUser);
router.route('/logout').post(userController.logoutUser);

export default router;
