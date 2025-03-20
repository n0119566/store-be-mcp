const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;