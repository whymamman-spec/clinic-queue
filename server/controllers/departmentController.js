/**
 * Department Controller
 * ---------------------
 * Handles all department-related requests.
 */

export async function getAllDepartments(req, res) {
  try {
    // Get the shared database connection
    const db = req.app.locals.db;

    // Query all departments, ordered alphabetically
    const departments = await db.all(`
      SELECT id, name, description
      FROM departments
      ORDER BY name ASC;
    `);

    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);

    res.status(500).json({
      message: "Failed to fetch departments.",
    });
  }
}
