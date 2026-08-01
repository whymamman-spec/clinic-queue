import { generateTimeSlots } from "../utils/generateTimeSlots.js";
import { generateBookingReference } from "../utils/generateBookingReference.js";

/**
 * GET /api/appointments/available-slots
 *
 * Query Parameters:
 * - departmentId
 * - date
 *
 * Example:
 * /api/appointments/available-slots?departmentId=3&date=2026-08-01
 */
export async function getAvailableSlots(req, res) {
  try {
    // Get query parameters
    const { departmentId, date } = req.query;

    // Basic validation
    if (!departmentId || !date) {
      return res.status(400).json({
        message: "departmentId and date are required.",
      });
    }

    // Shared database connection
    const db = req.app.locals.db;

    // Get all booked slots for the selected department and date
    const bookedAppointments = await db.all(
      `
      SELECT appointment_time
      FROM appointments
      WHERE department_id = ?
      AND appointment_date = ?
      AND status != 'Cancelled'
      `,
      [departmentId, date],
    );

    // Convert database rows into an array of time strings
    const bookedSlots = bookedAppointments.map(
      (appointment) => appointment.appointment_time,
    );

    // Generate the complete schedule
    const allSlots = generateTimeSlots();

    // Remove booked slots
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    res.status(200).json({
      departmentId,
      date,
      availableSlots,
    });
  } catch (error) {
    console.error("Error retrieving available slots:", error);

    res.status(500).json({
      message: "Unable to retrieve available slots.",
    });
  }
}

/**
 * POST /api/appointments
 *
 * Creates a new appointment booking.
 */
export async function createAppointment(req, res) {
  try {
    const db = req.app.locals.db;

    const {
      patient_name,
      phone,
      email,
      department_id,
      appointment_date,
      appointment_time,
    } = req.body;

    // -----------------------------
    // Basic Validation
    // -----------------------------
    if (
      !patient_name ||
      !phone ||
      !department_id ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    // -----------------------------
    // Verify Department Exists
    // -----------------------------
    const department = await db.get(
      `
      SELECT id
      FROM departments
      WHERE id = ?
      `,
      [department_id],
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found.",
      });
    }

    // -----------------------------
    // Verify Time Slot Is Valid
    // -----------------------------
    const validSlots = generateTimeSlots();

    if (!validSlots.includes(appointment_time)) {
      return res.status(400).json({
        message: "Invalid appointment time.",
      });
    }

    // -----------------------------
    // Check Slot Availability
    // -----------------------------
    const existingAppointment = await db.get(
      `
      SELECT id
      FROM appointments
      WHERE department_id = ?
      AND appointment_date = ?
      AND appointment_time = ?
      AND status != 'Cancelled'
      `,
      [department_id, appointment_date, appointment_time],
    );

    if (existingAppointment) {
      return res.status(409).json({
        message: "This appointment slot has already been booked.",
      });
    }

    // -----------------------------
    // Generate Booking Reference
    // -----------------------------
    const booking_reference = generateBookingReference();

    // -----------------------------
    // Save Appointment
    // -----------------------------
    await db.run(
      `
      INSERT INTO appointments (
        booking_reference,
        patient_name,
        phone,
        email,
        department_id,
        appointment_date,
        appointment_time,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Confirmed')
      `,
      [
        booking_reference,
        patient_name,
        phone,
        email || null,
        department_id,
        appointment_date,
        appointment_time,
      ],
    );

    res.status(201).json({
      message: "Appointment booked successfully.",
      booking_reference,
    });
  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      message: "Unable to create appointment.",
    });
  }
}

/**
 * GET /api/appointments/:bookingReference
 *
 * Retrieves a single appointment using its booking reference.
 */
export async function getAppointmentByReference(req, res) {
  try {
    const db = req.app.locals.db;

    const { bookingReference } = req.params;
    console.log("Looking up booking reference:", bookingReference);

    const appointment = await db.get(
      `
      SELECT
        appointments.booking_reference,
        appointments.patient_name,
        appointments.phone,
        appointments.email,
        appointments.appointment_date,
        appointments.appointment_time,
        appointments.status,
        departments.name AS department_name
      FROM appointments
      JOIN departments
        ON appointments.department_id = departments.id
      WHERE appointments.booking_reference = ?
      `,
      [bookingReference],
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Lookup error:", error);

    res.status(500).json({
      message: "Unable to retrieve appointment.",
    });
  }
}

/**
 * PATCH /api/appointments/:bookingReference/cancel
 *
 * Cancels an appointment.
 */
export async function cancelAppointment(req, res) {
  try {
    const db = req.app.locals.db;

    const { bookingReference } = req.params;

    // Check appointment exists
    const appointment = await db.get(
      `
      SELECT id, status
      FROM appointments
      WHERE booking_reference = ?
      `,
      [bookingReference],
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    if (appointment.status === "Cancelled") {
      return res.status(409).json({
        message: "Appointment has already been cancelled.",
      });
    }

    await db.run(
      `
      UPDATE appointments
      SET status = 'Cancelled'
      WHERE booking_reference = ?
      `,
      [bookingReference],
    );

    res.status(200).json({
      message: "Appointment cancelled successfully.",
    });
  } catch (error) {
    console.error("Cancellation error:", error);

    res.status(500).json({
      message: "Unable to cancel appointment.",
    });
  }
}
