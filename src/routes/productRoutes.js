const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, addMultipleProducts } = require('../controllers/productController');

// Get all products
router.get('/', getAllProducts);

// Add a product
router.post('/', addProduct);

// Add multiple products
router.post('/batch', addMultipleProducts);

module.exports = router;