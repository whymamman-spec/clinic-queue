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
