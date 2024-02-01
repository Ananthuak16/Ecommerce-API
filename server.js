// 1. Import Exprerss
import express from 'express';
import dotenv from 'dotenv';

import productRouter from './features/product/product.routes.js'; // Import productRouter
import userRouter from './features/user/user.routes.js';
import jwtAuth from './middlewares/jwt.middleware.js';
import { ApplicationError } from './error-handler/applicationError.js';

import mongoose from 'mongoose';

import { connectDB } from './config/mongoose.js';
// 2. Create Server
const server = express();

// load all the environment variables in application
dotenv.config();

server.use(express.json());

// 3. Use Routers
server.use('/products', productRouter); // Use productRouter for product-related routes
server.use('/users', userRouter);

// 4. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  // server errors.
  res.status(500).send('Something went wrong, please try later');
});

// 5. Specify port.
const port = process.env.PORT || 3000; // Add a default port if not specified in the environment variables

server.listen(port, async (err) => {
  if (err) {
    console.log(`server failed with error ${err}`);
  } else {
    await connectDB();
    console.log(`server is running at http://localhost:${port}`);
  }
});
