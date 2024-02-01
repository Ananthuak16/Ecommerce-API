// Importing ProductRepository for handling product-related database operations
import ProductRepository from './product.repository.js';

// ProductController class for handling product-related operations
export default class ProductController {
  // Constructor to initialize the product repository
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // Method for adding a new product
  async addProduct(req, res, next) {
    // Extracting name and quantity from the request body
    const { name, quantity } = req.body;
    try {
      // Calling addProduct method from the product repository
      const product = await this.productRepository.addProduct({ name, quantity });
      // Sending a success response with the newly created product
      res.status(201).send({ data: { product } });
    } catch (err) {
      // Handling errors and passing them to the next middleware
      next(err);
    }
  }

  // Method for listing all products
  async listProducts(req, res, next) {
    try {
      // Calling getAllProducts method from the product repository
      const products = await this.productRepository.getAllProducts();
      // Sending a success response with the list of products
      res.status(200).send({ data: { products } });
    } catch (err) {
      // Handling errors and passing them to the next middleware
      next(err);
    }
  }

  // Method for deleting a product by ID
  async deleteProduct(req, res, next) {
    // Extracting product ID from the request parameters
    const productId = req.params.id;
    try {
      // Calling deleteProduct method from the product repository
      const result = await this.productRepository.deleteProduct(productId);
      // Sending a success response with the result
      res.status(200).send({ data: result });
    } catch (err) {
      // Handling errors and passing them to the next middleware
      next(err);
    }
  }

  // Method for updating the quantity of a product by ID
  async updateProductQuantity(req, res, next) {
    // Extracting product ID from the request parameters and quantity from the query string
    const productId = req.params.id;
    const quantity = req.query.number;
    try {
      // Calling updateProductQuantity method from the product repository
      const result = await this.productRepository.updateProductQuantity(productId, quantity);
      // Sending a success response with the result
      res.status(200).send({ data: result });
    } catch (err) {
      // Handling errors and passing them to the next middleware
      next(err);
    }
  }
}
