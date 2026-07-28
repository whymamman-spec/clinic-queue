import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Re-create __dirname because ES Modules don't provide it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the SQLite database file
const DATABASE_PATH = path.join(__dirname, "clinicqueue.db");

// Path to SQL files
const SCHEMA_PATH = path.join(__dirname, "schema.sql");
const SEED_PATH = path.join(__dirname, "seed.sql");

/**
 * Initializes the ClinicQueue database.
 * - Opens the SQLite database.
 * - Creates tables from schema.sql.
 * - Inserts initial data from seed.sql.
 */
export async function initializeDatabase() {
  // Open (or create) the database
  const db = await open({
    filename: DATABASE_PATH,
    driver: sqlite3.Database,
  });

  // Read SQL files
  const schema = await fs.readFile(SCHEMA_PATH, "utf8");
  const seed = await fs.readFile(SEED_PATH, "utf8");

  // Create tables
  await db.exec(schema);

  // Insert seed data
  await db.exec(seed);

  console.log("✅ SQLite database initialized successfully.");

  return db;
}
