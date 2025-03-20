// This script is used to start the application and connect to the real database

const connectDB = require('../config/db');
const { app } = require('../../server');

// Connect to database
connectDB();

// Set port
const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});