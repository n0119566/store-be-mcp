const express = require('express');
const router = express.Router();
const { getAllCustomers, getCustomerById, getCustomerOrders, addCustomer, addMultipleCustomers } = require('../controllers/customerController');

// Get all customers
router.get('/', getAllCustomers);

// Get customer by ID
router.get('/:id', getCustomerById);

// Get all orders for a customer
router.get('/:id/orders', getCustomerOrders);

// Add a customer
router.post('/', addCustomer);

// Add multiple customers
router.post('/batch', addMultipleCustomers);

module.exports = router;