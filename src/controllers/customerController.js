const { Customer } = require('../models');

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add a customer
const addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add multiple customers
const addMultipleCustomers = async (req, res) => {
  try {
    const customers = await Customer.insertMany(req.body);
    res.status(201).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllCustomers,
  addCustomer,
  addMultipleCustomers
};