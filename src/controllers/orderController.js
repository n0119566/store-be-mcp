const { Order } = require('../models');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email')
      .populate('items.product', 'name price');
    
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add an order
const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const populatedOrder = await Order.findById(order._id)
      .populate('customer', 'name email')
      .populate('items.product', 'name price');
    
    res.status(201).json({ success: true, data: populatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add multiple orders
const addMultipleOrders = async (req, res) => {
  try {
    const orders = await Order.insertMany(req.body);
    const orderIds = orders.map(order => order._id);
    
    const populatedOrders = await Order.find({ _id: { $in: orderIds } })
      .populate('customer', 'name email')
      .populate('items.product', 'name price');
    
    res.status(201).json({ success: true, count: populatedOrders.length, data: populatedOrders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  addMultipleOrders
};