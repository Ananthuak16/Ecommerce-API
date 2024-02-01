// Importing necessary modules
import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// Creating a model from the user schema
const UserModel = mongoose.model('User', userSchema);

// UserRepository class for interacting with the User model in the database
export default class UserRepository {

    // Method for resetting user password by updating the hashed password
    async resetPassword(userID, hashedPassword) {
        try {
            // Find user by ID
            let user = await UserModel.findById(userID);
            if (user) {
                // Update user's password and save changes
                user.password = hashedPassword;
                await user.save();
            } else {
                // If no user found, throw an error
                throw new Error("No such user found");
            }
        } catch (err) {
            // Log any errors and throw a custom application error
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    // Method for user signup
    async signUp(user) {
        try {
            // Create an instance of the User model
            const newUser = new UserModel(user);
            // Save the new user to the database
            await newUser.save();
            // Return the newly created user
            return newUser;
        } catch (err) {
            // Handle validation errors separately
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                // Log any other errors and throw a custom application error
                console.log(err);
                throw new ApplicationError("Something went wrong with the database", 500);
            }
        }
    }

    // Method for user signin
    async signIn(email, password) {
        try {
            // Find a user with the provided email and password
            return await UserModel.findOne({ email, password });
        } catch (err) {
            // Log any errors and throw a custom application error
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    // Method for finding a user by email
    async findByEmail(email) {
        try {
            // Find a user with the provided email
            return await UserModel.findOne({ email });
        } catch (err) {
            // Log any errors and throw a custom application error
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    // Method for finding a user by ID
    async findById(id) {
        try {
            // Find a user with the provided ID
            return await UserModel.findById(id);
        } catch (err) {
            // Log any errors and throw a standard JavaScript error
            console.log(err);
            throw new Error('Error fetching user from the database');
        }
    }
}
