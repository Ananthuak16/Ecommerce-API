
# Ecommerce API

## Introduction

This Node.js and MongoDB-based Ecommerce API is designed to provide essential functionality for managing product inventory on an ecommerce platform. The API includes endpoints for adding products, listing products, deleting products, and updating product quantities.

## Tech Stack

- Node.js
- MongoDB

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and set your MongoDB connection string:

   ```env
  mongodb://127.0.0.1:27017/Ecommerce_API
   ```

   Replace the connection string with your MongoDB instance details.

5. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Add Product

- **URL:** `/products/create`
- **Method:** `POST`
- **Request:**

  ```json
  {
    
      "name": "laptop",
      "quantity": 10
    }
  
  ```

- **Response:**

  ```json
  {
    "data": {
      
        "name": "laptop",
        "quantity": 10
      
    }
  }
  ```

### List Products

- **URL:** `/products`
- **Method:** `GET`
- **Response:**

  ```json
  {
    "data": {
    
        {
          "id": 1,
          "name": "laptop",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "camera",
          "quantity": 5
        },
        {
          "id": 3,
          "name": "smartwatch",
          "quantity": 8
        }
      
    }
  }
  ```

### Delete Product

- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Response:**

  ```json
  {
    "data": {
      "message": "Product deleted"
    }
  }
  ```

### Update Quantity

- **URL:** `/products/:id/update_quantity/?number=10`
- **Method:** `POST`
- **Response:**

  ```json
  {
    "data": {
      
        "id": 1,
        "name": "laptop",
        "quantity": 20
      },
      "message": "Updated successfully"
    }
  
  ```

## Extra Points

- The code is well-commented for better understanding.
- A scalable folder structure is implemented with separate directories for models, controllers, and routes.

Feel free to explore and integrate these API endpoints using Postman or any other API testing tool. If you have any questions or issues, please refer to the documentation or reach out to the project maintainers.

Happy coding! 🚀
