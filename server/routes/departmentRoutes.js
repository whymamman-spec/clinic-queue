import express from "express";
import { getAllDepartments } from "../controllers/departmentController.js";

const router = express.Router();

/**
 * GET /api/departments
 * Returns all hospital departments.
 */
router.get("/", getAllDepartments);

export default router;
