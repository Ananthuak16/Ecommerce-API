
// 1. Import express and necessary modules.
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const userRouter = express.Router();

// Create an instance of the UserController.
const userController = new UserController();

// Define routes and link them to controller methods.

// Route for user signup
userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next);
});

// Route for user signin
userRouter.post('/signin', (req, res) => {
    userController.signIn(req, res);
});

// Route for resetting password, requiring JWT authentication middleware
userRouter.put('/resetPassword', jwtAuth, (req, res, next) => {
    userController.resetPassword(req, res, next);
});

// Export the userRouter for use in other parts of the application.
export default userRouter;
