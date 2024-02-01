// Importing Mongoose for schema definition
import mongoose from "mongoose";

// Defining the user schema using Mongoose
export const userSchema = new mongoose.Schema({
    // User's name with a maximum length of 25 characters
    name: { 
        type: String, 
        maxLength: [25, "Name can't be greater than 25 characters"]
    },

    // User's email with uniqueness and validation using a regular expression
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },

    // User's password field (additional validations can be added)
    password: {
        type: String,
        
    },

    // User's type with options limited to 'Customer' or 'admin'
    type: { 
        type: String, 
        enum: ['Customer', 'admin'] 
    }
});
