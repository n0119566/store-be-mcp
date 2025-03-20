const express = require('express');
const router = express.Router();
const { getAllCustomers, addCustomer, addMultipleCustomers } = require('../controllers/customerController');

// Get all customers
router.get('/', getAllCustomers);

// Add a customer
router.post('/', addCustomer);

// Add multiple customers
router.post('/batch', addMultipleCustomers);

module.exports = router;