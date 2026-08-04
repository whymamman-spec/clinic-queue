import api from "../api/api";

/**
 * Fetch all available appointment slots
 * for a department on a selected date.
 */
export async function getAvailableSlots(departmentId, date) {
  const response = await api.get("/appointments/available-slots", {
    params: {
      departmentId,
      date,
    },
  });

  return response.data;
}

/**
 * Create a new appointment.
 */
export async function createAppointment(appointmentData) {
  const response = await api.post("/appointments", appointmentData);

  return response.data;
}

/**
 * Retrieve an appointment using its booking reference.
 */
export async function getAppointmentByReference(bookingReference) {
  const response = await api.get(`/appointments/${bookingReference}`);

  return response.data;
}

/**
 * Cancel an appointment using its booking reference.
 */
export async function cancelAppointment(bookingReference) {
  const response = await api.patch(`/appointments/${bookingReference}/cancel`);

  return response.data;
}
