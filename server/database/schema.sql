-- =====================================================
-- ClinicQueue Database Schema
-- =====================================================

-- -----------------------------------------------------
-- Departments Table
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- -----------------------------------------------------
-- Appointments Table
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    booking_reference TEXT NOT NULL UNIQUE,

    patient_name TEXT NOT NULL,

    phone TEXT NOT NULL,

    email TEXT,

    department_id INTEGER NOT NULL,

    appointment_date TEXT NOT NULL,

    appointment_time TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'Pending',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
);

-- -----------------------------------------------------
-- Indexes
-- -----------------------------------------------------

-- Speeds up appointment lookups by date and department
CREATE INDEX IF NOT EXISTS idx_appointments_date_department
ON appointments (appointment_date, department_id);

-- Speeds up booking reference lookups
CREATE INDEX IF NOT EXISTS idx_booking_reference
ON appointments (booking_reference);