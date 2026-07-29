import express from "express";

import {
  getAvailableSlots,
  createAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

/**
 * GET /api/appointments/available-slots
 *
 * Returns all available appointment slots
 * for a department on a given date.
 *
 * Example:
 * /api/appointments/available-slots?departmentId=1&date=2026-08-01
 */
router.get("/available-slots", getAvailableSlots);

router.post("/", createAppointment);

export default router;
