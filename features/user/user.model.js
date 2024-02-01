// Importing necessary modules
import { connectDB } from '../../config/mongoose.js';
import { ApplicationError } from "../../error-handler/applicationError.js";

// UserModel class representing a user in the application
export default class UserModel {
  // Constructor to initialize user properties
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  // Static method to get all users (temporary implementation using a static array)
  static getAll() {
    return users;
  }
}

// Temporary array of users (replace with database operations)
var users = [
  {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'admin',
  },
  {
    id: 2,
    name: 'Customer User',
    email: 'customer@ecom.com',
    password: 'Password1',
    type: 'customer',
  },
];
