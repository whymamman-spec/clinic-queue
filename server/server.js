import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initializeDatabase } from "./database/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Health Check Route
// ==============================
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ClinicQueue API",
    status: "Server is running successfully",
  });
});

// ==============================
// Start Server
// ==============================
async function startServer() {
  try {
    // Initialize SQLite
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);

    process.exit(1);
  }
}

startServer();
