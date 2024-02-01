// Importing mongoose for schema definition
import mongoose from 'mongoose';

// Defining the product schema using Mongoose
export const productSchema = new mongoose.Schema({
  // Product name is required
  name: { type: String, required: true },

  // Product quantity is required and of type Number
  quantity: { type: Number, required: true },
});

// Creating and exporting the Product model based on the schema
export default mongoose.model('Product', productSchema);
