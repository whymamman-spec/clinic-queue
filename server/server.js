// Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define the server port
const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the ClinicQueue API 🚀",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
