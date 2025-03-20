const { Product } = require('../models');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add a product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add multiple products
const addMultipleProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.status(201).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  addMultipleProducts
};