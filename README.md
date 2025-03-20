# Store Backend API

A simple Express API for tracking customers, products, and orders.

## Tech Stack

- Express.js - Web framework
- Mongoose - MongoDB ODM
- Axios - HTTP client
- Jest - Testing framework
- MongoDB - Database

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB running locally on port 27017

### Installation

1. Install dependencies:

```
npm install
```

2. Run tests:

```
npm test
```

3. Seed the database with sample data:

```
npm run seed
```

4. Start the server:

```
npm start
```

Or for development with hot reloading:

```
npm run dev
```

## API Endpoints

### Products

- GET `/api/products` - Get all products
- POST `/api/products` - Add a product
- POST `/api/products/batch` - Add multiple products

### Customers

- GET `/api/customers` - Get all customers  
- POST `/api/customers` - Add a customer
- POST `/api/customers/batch` - Add multiple customers

### Orders

- GET `/api/orders` - Get all orders
- POST `/api/orders` - Add an order  
- POST `/api/orders/batch` - Add multiple orders

## Data Models

### Product

- name (String, required)
- description (String)
- price (Number, required)
- category (String)
- inStock (Boolean, default: true)
- createdAt (Date, default: now)

### Customer

- name (String, required)
- email (String, required, unique)
- phone (String)
- address (Object)
  - street (String)
  - city (String)
  - state (String)
  - zip (String)
  - country (String)
- createdAt (Date, default: now)

### Order

- customer (ObjectId, ref: 'Customer')
- items (Array)
  - product (ObjectId, ref: 'Product')
  - quantity (Number, min: 1)
  - price (Number)
- totalAmount (Number)
- status (String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
- paymentMethod (String, enum: ['credit_card', 'debit_card', 'paypal', 'cash'])
- createdAt (Date, default: now)