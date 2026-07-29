import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initializeDatabase } from "./database/db.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();
//===============================
// Pretty-print JSON responses during development
app.set("json spaces", 2);
//===============================
const PORT = process.env.PORT || 5000;

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

//===============================
// Register routes
//===============================
app.use("/api/departments", departmentRoutes);
app.use("/api/appointments", appointmentRoutes);

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
    const db = await initializeDatabase();

    // Make the database available throughout the app
    app.locals.db = db;

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
