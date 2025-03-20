const express = require('express');
const router = express.Router();
const { getAllOrders, addOrder, addMultipleOrders } = require('../controllers/orderController');

// Get all orders
router.get('/', getAllOrders);

// Add an order
router.post('/', addOrder);

// Add multiple orders
router.post('/batch', addMultipleOrders);

module.exports = router;