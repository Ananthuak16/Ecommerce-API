// Importing ProductModel from product.schema.js
import ProductModel from './product.schema.js';

// ProductRepository class for interacting with the Product model in the database
export default class ProductRepository {
  
  // Method for adding a new product to the database
  async addProduct(product) {
    try {
      // Creating a new instance of the ProductModel
      const newProduct = new ProductModel(product);
      // Saving the new product to the database
      await newProduct.save();
      // Returning the newly created product
      return newProduct;
    } catch (err) {
      // Logging any errors and throwing a standard JavaScript error
      console.log(err);
      throw new Error('Error adding product to the database');
    }
  }

  // Method for fetching all products from the database
  async getAllProducts() {
    try {
      // Finding and returning all products from the database
      return await ProductModel.find();
    } catch (err) {
      // Logging any errors and throwing a standard JavaScript error
      console.log(err);
      throw new Error('Error fetching products from the database');
    }
  }

  // Method for deleting a product from the database by ID
  async deleteProduct(id) {
    try {
      // Finding and deleting the product by ID
      await ProductModel.findByIdAndDelete(id);
      // Returning a success message
      return { message: 'Product deleted' };
    } catch (err) {
      // Logging any errors and throwing a standard JavaScript error
      console.log(err);
      throw new Error('Error deleting product from the database');
    }
  }

  // Method for updating the quantity of a product by ID
  async updateProductQuantity(id, quantity) {
    try {
      // Finding the product by ID
      const product = await ProductModel.findById(id);
      if (!product) {
        // If product not found, throw an error
        throw new Error('Product not found');
      }

      // Updating the product quantity and saving changes
      product.quantity += parseInt(quantity);
      await product.save();

      // Returning the updated product and a success message
      return { product, message: 'Updated successfully' };
    } catch (err) {
      // Logging any errors and throwing a standard JavaScript error
      console.log(err);
      throw new Error('Error updating product quantity');
    }
  }
}
