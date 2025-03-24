const { Customer, Order } = require('../models');

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all orders for a customer
const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.params.id;
    
    // First check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    
    const orders = await Order.find({ customer: customerId })
      .populate('customer', 'name email')
      .populate('items.product', 'name price');
    
    res.status(200).json({ success: true, count: orders.length, data: orders });
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
  getCustomerById,
  getCustomerOrders,
  addCustomer,
  addMultipleCustomers
};