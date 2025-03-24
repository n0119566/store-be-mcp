const express = require("express");
const productRoutes = require("./src/routes/productRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const morgan = require("morgan");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Store API" });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Server Error",
  });
});

// Only start the server when this file is run directly
if (require.main === module) {
  const connectDB = require("./src/config/db");
  // Connect to database
  connectDB();

  // Set port
  const PORT = process.env.PORT || 3000;

  // Start server
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For testing
module.exports = { app };
