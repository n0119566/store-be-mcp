const express = require('express');
const router = express.Router();
const { getAllCustomers, getCustomerById, getCustomersByName, getCustomerOrders, addCustomer, addMultipleCustomers } = require('../controllers/customerController');

// Get all customers or search by name
router.get('/', (req, res) => {
  if (req.query.name) {
    return getCustomersByName(req, res);
  }
  return getAllCustomers(req, res);
});

// Get customer by ID
router.get('/:id', getCustomerById);

// Get all orders for a customer
router.get('/:id/orders', getCustomerOrders);

// Add a customer
router.post('/', addCustomer);

// Add multiple customers
router.post('/batch', addMultipleCustomers);

module.exports = router;