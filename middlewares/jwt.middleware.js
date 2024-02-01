// middlewares/jwt.middleware.js

// Importing necessary modules
import jwt from 'jsonwebtoken';
import UserRepository from '../features/user/user.repository.js';

// Middleware for JWT authentication
const jwtAuth = async (req, res, next) => {
  // 1. Read the token from the request headers.
  const token = req.headers['authorization'];

  // 2. If no token is provided, return an unauthorized response.
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  // 3. Check if the token is valid.
  try {
    // Decoding the token using the secret key
    const payload = jwt.verify(token, 'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz');

    // 4. Check user type (Assuming you have a user repository)
    const userRepository = new UserRepository();

    // Fetching the user from the database using the user ID from the decoded token
    const user = await userRepository.findById(payload.userID);

    // If the user doesn't exist or is not an admin, return a forbidden response.
    if (!user || user.type !== 'admin') {
      return res.status(403).send('Forbidden. Admin access required.');
    }

    // If the user is authenticated and is an admin, set the user ID in the request object.
    req.userID = payload.userID;

    // Move to the next middleware or route handler.
    next();
  } catch (err) {
    // 5. If an error occurs during token verification, log the error and return an unauthorized response.
    console.log(err);
    return res.status(401).send('Unauthorized');
  }
};

// Exporting the JWT authentication middleware
export default jwtAuth;
