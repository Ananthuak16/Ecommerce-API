// Importing necessary modules
import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

// UserController class for handling user-related operations
export default class UserController {

  // Constructor to initialize the user repository
  constructor(){
    this.userRepository = new UserRepository();
  }

  // Method for resetting user password
  async resetPassword(req, res, next){
    // Extracting new password from the request body
    const {newPassword} = req.body;
    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    // Extracting user ID from the authenticated request
    const userID = req.userID;
    try {
      // Calling the resetPassword method from the user repository
      await this.userRepository.resetPassword(userID, hashedPassword)
      // Sending a success response
      res.status(200).send("Password is updated");
    } catch(err) {
      // Handling errors and passing them to the next middleware
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  // Method for user signup
  async signUp(req, res, next) {
    // Extracting user details from the request body
    const {
      name,
      email,
      password,
      type,
    } = req.body;
    try {
      // Hashing the user's password
      const hashedPassword = await bcrypt.hash(password, 12)
      // Creating a new UserModel instance
      const user = new UserModel(
        name,
        email,
        hashedPassword,
        type
      );
      // Calling the signUp method from the user repository
      await this.userRepository.signUp(user);
      // Sending a success response with the newly created user
      res.status(201).send(user);
    } catch(err) {
      // Handling errors and passing them to the next middleware
      next(err);
    }
  }

  // Method for user signin
  async signIn(req, res, next) {
    try {
      // 1. Find user by email.
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        // Return an error response for incorrect credentials
        return res.status(400).send('Incorrect Credentials');
      } else {
        // 2. Compare password with hashed password.
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
            {
              expiresIn: '1h',
            }
          );
          // 4. Send the token as a response.
          return res.status(200).send(token);
        } else {
          // Return an error response for incorrect credentials
          return res.status(400).send('Incorrect Credentials');
        }
      }
    } catch(err) {
      // Log any errors and return a generic error response
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
}
