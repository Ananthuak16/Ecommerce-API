// Importing necessary modules
import express from 'express';
import ProductController from './product.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// Initializing Express router
const productRouter = express.Router();
const productController = new ProductController();

// Route for creating a new product, requires JWT authentication middleware
productRouter.post('/create', jwtAuth, (req, res, next) => {
  productController.addProduct(req, res, next);
});

// Route for listing all products
productRouter.get('/', (req, res, next) => {
  productController.listProducts(req, res, next);
});

// Route for deleting a product by ID, requires JWT authentication middleware
productRouter.delete('/:id', jwtAuth, (req, res, next) => {
  // Note: The provided URL 'http://localhost:3000/products/create' seems to be a comment or a mistake
  productController.deleteProduct(req, res, next);
});

// Route for updating the quantity of a product by ID, requires JWT authentication middleware
productRouter.post('/:id/update_quantity', jwtAuth, (req, res, next) => {
  productController.updateProductQuantity(req, res, next);
});

// Exporting the productRouter for use in other parts of the application
export default productRouter;
