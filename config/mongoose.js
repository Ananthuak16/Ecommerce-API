// Importing necessary modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// Loading environment variables from a .env file
dotenv.config();

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    console.log("db connecting...");
    
    // Logging the MongoDB URI from the environment variables
    console.log("mongo uri=", process.env.mongoURL);
    
    // Establishing a connection to MongoDB using Mongoose
    const res = await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Logging a success message with the connected server host
    console.log(`mongodb connected with server ${res.connection.host}`);
  } catch (error) {
    // Logging an error message if the connection fails
    console.log("mongodb connection failed!");
    console.log(error);
  }
};
