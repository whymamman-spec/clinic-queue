import api from "../api/api";

/**
 * Fetch all hospital departments.
 */
export async function getDepartments() {
  const response = await api.get("/departments");

  return response.data;
}
