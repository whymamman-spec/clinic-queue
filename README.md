# ClinicQueue

> **ClinicQueue** is a full-stack clinic appointment booking application
> designed to help Nigerian clinics reduce long queues and unnecessary
> waiting times by allowing patients to view available appointment
> slots, book appointments, retrieve their booking details, and cancel
> appointments.

ClinicQueue was developed as the **capstone project for the 3MTT NextGen
Software Development cohort** and was a required project for
completion/certification as a **Software Developer**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Project Goals](#project-goals)
- [MVPs and Delivery](#mvps-and-delivery)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [Appointment Booking Logic](#appointment-booking-logic)
- [API Overview](#api-overview)
- [User Experience and UI](#user-experience-and-ui)
- [Validation and Error Handling](#validation-and-error-handling)
- [Testing and Verification](#testing-and-verification)
- [Deployment](#deployment)
- [Deployment Issue: SQLite and
  GLIBC](#deployment-issue-sqlite-and-glibc)
- [SQLite Production Limitation](#sqlite-production-limitation)
- [Environment Variables](#environment-variables)
- [Running the Project Locally](#running-the-project-locally)
- [Future Improvements](#future-improvements)
- [Learning Outcomes](#learning-outcomes)
- [3MTT NextGen Capstone](#3mtt-nextgen-capstone)
- [Project Status](#project-status)
- [Author](#author)

---

## Project Overview

ClinicQueue is a clinic appointment management application built around
a simple idea:

> **Patients should not have to spend hours waiting in a clinic simply
> to access routine healthcare services.**

The application provides a digital workflow through which patients can
select a department, choose a date, view available appointment slots,
provide their information, and receive a unique booking reference.

Patients can subsequently use that booking reference to retrieve their
appointment and cancel it when necessary.

The project was developed as a practical full-stack software development
project, covering frontend development, backend API development,
database integration, validation, user experience, testing, Git/GitHub
workflow, and cloud deployment.

---

## Problem Statement

Many clinics experience challenges such as:

- Long queues at registration and appointment points
- Unpredictable waiting times
- Manual appointment processes
- Limited visibility into available appointment slots
- Difficulty managing cancellations
- Inefficient use of clinic staff time
- Patients spending unnecessary time physically waiting for services

ClinicQueue addresses the appointment-booking portion of this problem by
moving the initial scheduling process online.

---

## Solution

ClinicQueue provides a simple web-based appointment workflow:

1.  The patient selects a department.
2.  The patient selects an appointment date.
3.  The system retrieves available appointment slots.
4.  The patient selects an available time.
5.  The patient enters their contact information.
6.  The appointment is submitted to the backend.
7.  The backend validates and stores the appointment.
8.  A unique booking reference is generated.
9.  The patient can later retrieve the appointment using the reference.
10. The patient can cancel the appointment when necessary.
11. A cancelled appointment releases its time slot for future booking.

---

## Project Goals

- Build a functional full-stack web application.
- Demonstrate REST API development.
- Connect a React frontend to an Express backend.
- Integrate a relational database.
- Implement appointment availability logic.
- Prevent double-booking of appointment slots.
- Support appointment cancellation.
- Provide useful validation and error feedback.
- Create a responsive user interface.
- Deploy the application to the cloud.
- Demonstrate practical software development skills required for the
  3MTT NextGen certification.

---

# MVPs and Delivery

## MVP 1 --- Department and Appointment Selection

### Requirement

Patients should be able to select:

- A clinic department
- An appointment date
- An available appointment time

### Delivered

- Department data is retrieved from the backend API.
- Appointment dates can be selected through the booking interface.
- Available time slots are retrieved dynamically.
- A patient cannot proceed without the required appointment
  information.

**Status: Delivered**

---

## MVP 2 --- Appointment Booking

### Requirement

Patients should be able to submit their appointment information and
receive confirmation.

### Delivered

The booking form collects:

- Patient name
- Phone number
- Email address (optional)
- Department
- Appointment date
- Appointment time

The backend creates the appointment and generates a unique booking
reference.

Example:

```text
CQ-9QE4SB
```

The confirmation screen displays the booking reference and appointment
details.

**Status: Delivered**

---

## MVP 3 --- Appointment Availability and Slot Management

### Requirement

The system should prevent multiple patients from booking the same
appointment slot.

### Delivered

Appointment availability is calculated by the backend.

Once a slot is booked, it is no longer returned as available for the
relevant department/date combination.

When an appointment is cancelled, the slot becomes available again.

```text
Available
    ↓
Booked / Confirmed
    ↓
Cancelled
    ↓
Available Again
```

**Status: Delivered**

---

## MVP 4 --- Appointment Management

### Requirement

Patients should be able to retrieve an existing appointment.

### Delivered

The **Manage Appointment** page allows a patient to enter a booking
reference and retrieve the corresponding appointment.

The system displays:

- Booking reference
- Patient name
- Phone number
- Email
- Department
- Appointment date
- Appointment time
- Appointment status

**Status: Delivered**

---

## MVP 5 --- Appointment Cancellation

### Requirement

Patients should be able to cancel an existing appointment.

### Delivered

Cancellation includes:

- Appointment lookup
- Custom confirmation modal
- Cancellation request
- Loading state
- Updated appointment status
- Release of the appointment slot
- Success toast notification
- Error toast notification
- Disabled cancellation button after cancellation

The application prevents an already cancelled appointment from being
cancelled again.

**Status: Delivered**

---

## MVP 6 --- Production Deployment

### Requirement

The completed application should be available as a deployed web
application.

### Delivered

- **Vercel** hosts the React frontend.
- **Render** hosts the Express backend/API.
- **SQLite** provides the MVP database.
- The production frontend successfully communicates with the deployed
  backend.
- The major workflows tested locally were retested successfully in
  production.

**Status: Delivered**

---

# Key Features

## Appointment Booking

- Department selection
- Date selection
- Dynamic appointment availability
- Time-slot selection
- Patient information form
- Booking validation
- Appointment creation
- Booking reference generation
- Booking confirmation

## Appointment Management

- Booking reference lookup
- Appointment detail display
- Appointment status display
- Appointment cancellation

## User Experience

- Responsive interface
- Loading states
- Form validation
- Error messages
- Success messages
- Toast notifications
- Custom confirmation modal
- Disabled states during asynchronous operations

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- React Hot Toast

## Backend

- Node.js
- Express
- CORS
- dotenv

## Database

- SQLite
- sqlite3
- sqlite package

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Thunder Client
- Browser Developer Tools

## Deployment

- Vercel --- frontend hosting
- Render --- backend/API hosting
- GitHub --- source-code repository

---

# Application Architecture

```text
                     GitHub
                        │
               ClinicQueue Repository
                        │
              ┌─────────┴─────────┐
              │                   │
           client/             server/
              │                   │
              ▼                   ▼
           Vercel              Render
              │                   │
       React/Vite UI         Express API
              │                   │
              └─────────┬─────────┘
                        │
                      SQLite
```

The React frontend handles the interface, state, forms, validation, API
requests, and feedback.

The Express backend handles API requests, appointment availability,
booking, cancellation, booking-reference generation, and database
operations.

---

# Project Structure

```text
ClinicQueue/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── database/
│   │   ├── db.js
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

# Appointment Booking Logic

An appointment is identified by:

```text
Department
+
Appointment Date
+
Appointment Time
```

The backend checks availability before creating a booking.

A booked slot is removed from the available slots returned to the
frontend.

When an appointment is cancelled, its status changes to:

```text
Cancelled
```

and the time slot can become available again.

This prevents double-booking and maintains the core appointment
lifecycle.

---

# API Overview

## Departments

```text
GET /api/departments
```

Retrieves available clinic departments.

## Available Appointment Slots

```text
GET /api/appointments/available-slots
```

Retrieves slots available for a requested department and date.

## Create Appointment

```text
POST /api/appointments
```

Creates a new appointment.

Example request:

```json
{
  "patient_name": "John Doe",
  "phone": "08000000000",
  "email": "john@example.com",
  "department_id": 1,
  "appointment_date": "2026-08-18",
  "appointment_time": "09:00"
}
```

## Retrieve Appointment

```text
GET /api/appointments/:bookingReference
```

Retrieves an appointment using its booking reference.

## Cancel Appointment

```text
PATCH /api/appointments/:bookingReference/cancel
```

Cancels the specified appointment.

---

# User Experience and UI

ClinicQueue received a final UX/UI polish pass before deployment.

This included:

- Responsive layouts
- Consistent spacing
- Improved button states
- Loading indicators
- Search/loading feedback
- Custom cancellation confirmation modal
- Toast notifications
- Validation messages
- Error presentation
- Disabled states during requests
- Footer spacing adjustments

The booking and appointment-management workflows were checked across
responsive layouts before production deployment.

---

# Validation and Error Handling

The application validates important user actions before sending
requests.

Examples include:

- Missing department
- Missing appointment date
- Missing appointment time
- Missing patient name
- Missing phone number
- Empty booking reference
- Appointment not found
- Appointment cancellation failure
- Booking failure
- Occupied appointment slot

Feedback is provided using inline validation messages, loading states,
and toast notifications.

---

# Testing and Verification

## Local Testing

The following workflows were tested locally:

- Department retrieval
- Available slot retrieval
- Appointment booking
- Booking reference generation
- Duplicate booking prevention
- Appointment lookup
- Appointment cancellation
- Slot release after cancellation
- Loading states
- Validation
- Error handling
- Confirmation modal
- Toast notifications
- Responsive UI

## Production Testing

After deployment, the same major workflows were tested against the live
application.

The production tests confirmed that:

- The Vercel frontend loads successfully.
- The frontend communicates with the Render backend.
- Department data is retrieved correctly.
- Appointment booking works.
- Booking references are generated.
- Appointment lookup works.
- Appointment cancellation works.
- Cancellation feedback works.
- Validation and error handling work.
- Responsive behavior remains functional.

**Production functional testing: Passed**

---

# Deployment

ClinicQueue uses a two-service deployment architecture:

```text
React/Vite Frontend
        │
        ▼
     Vercel
        │
        │ API requests
        ▼
Express Backend
        │
        ▼
     Render
        │
        ▼
     SQLite
```

## Frontend

The React/Vite client is deployed to Vercel.

Production frontend:

`https://clinic-queue-xi.vercel.app`

The frontend uses:

```env
VITE_API_URL=https://clinic-queue-kqnd.onrender.com/api
```

## Backend

The Express API is deployed to Render.

Production backend:

`https://clinic-queue-kqnd.onrender.com`

The backend exposes:

```text
GET /
```

as a health-check endpoint.

---

# Deployment Issue: SQLite and GLIBC

During the initial Render deployment, the build completed successfully
but the service failed while starting.

The key error was:

```text
Error: /lib/x86_64-linux-gnu/libm.so.6:
version `GLIBC_2.38' not found
(required by .../sqlite3.node)

code: ERR_DLOPEN_FAILED
```

## Why It Happened

The project uses `sqlite3`, which contains a native Node.js binary.

The installed SQLite native binary required a newer version of the GNU C
Library (`glibc`) than the Render runtime provided.

In simplified form:

```text
Local/build environment
        ↓
sqlite3 native binary
        ↓
Requires GLIBC_2.38

Render runtime
        ↓
Older GLIBC version
        ↓
Native binary cannot load
```

The application code was not the immediate cause. The issue was
compatibility between the native `sqlite3` binary and the Linux runtime
used by the hosting platform.

## How It Was Solved

The SQLite native module was rebuilt from source for the deployment
environment.

The relevant approach was:

```bash
npm install
npm rebuild sqlite3 --build-from-source
```

The Render build/cache was also cleared so the incompatible native
binary would not continue to be reused.

After rebuilding `sqlite3` for the target environment, the service
started successfully and the Render deployment became live.

This provided an important deployment lesson: **native Node.js
dependencies may require environment-specific compilation when prebuilt
binaries are incompatible with the hosting runtime.**

---

# SQLite Production Limitation

ClinicQueue currently uses SQLite because it is lightweight, simple to
configure, and appropriate for demonstrating the MVP.

However, the database is stored as a local file:

```text
server/database/clinicqueue.db
```

This is suitable for the capstone MVP and demonstration environment, but
it is **not an ideal production database architecture for a real clinic
appointment system**.

A production application would require persistent managed storage,
backups, recovery procedures, reliable multi-instance access, and
stronger scalability.

Because the deployed application uses a local SQLite file on the backend
service, persistent data should not be treated as guaranteed permanent
storage in a cloud environment where the service filesystem may be
ephemeral or replaced.

## Future Production Database

A future production version should migrate from SQLite to a managed
relational database such as:

```text
PostgreSQL
```

The API/database separation makes such a migration practical.

---

# Environment Variables

## Frontend

Create:

```text
client/.env
```

For local development:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://clinic-queue-kqnd.onrender.com/api
```

## Backend

The backend supports the hosting platform's assigned port:

```env
PORT=5000
```

with:

```js
const PORT = process.env.PORT || 5000;
```

---

# Running the Project Locally

## 1. Clone the Repository

```bash
git clone <repository-url>
cd ClinicQueue
```

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

## 3. Configure Frontend Environment Variables

Create:

```text
client/.env
```

and add:

```env
VITE_API_URL=http://localhost:5000/api
```

## 4. Start the Frontend

```bash
npm run dev
```

## 5. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

## 6. Start the Backend

Development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend normally runs on:

```text
http://localhost:5000
```

---

# Future Improvements

## Database

- Migrate from SQLite to PostgreSQL.
- Introduce managed cloud database hosting.
- Implement database backups and recovery.

## Authentication

- Patient accounts
- Secure authentication
- Password reset
- Role-based access control
- Staff/admin accounts

## Clinic Management

- Admin dashboard
- Department management
- Doctor/provider management
- Clinic operating hours
- Appointment capacity management

## Notifications

- Email booking confirmations
- SMS reminders
- Appointment reminders
- Cancellation notifications

## Appointment Management

- Rescheduling
- Appointment history
- Doctor-specific schedules
- Multiple appointment types
- Waiting-list functionality

## Security

- Stronger server-side validation
- Rate limiting
- Authentication and authorization
- Security headers
- Audit logging
- Protection of sensitive patient information

## Scalability

- Managed PostgreSQL
- Persistent storage
- Horizontal scaling
- Background job processing
- Monitoring and logging

---

# Learning Outcomes

Developing ClinicQueue provided practical experience in:

- React application development
- Component-based UI architecture
- React state management
- React hooks
- React Router
- REST API consumption
- Axios
- Express.js
- Node.js
- SQLite database integration
- SQL schema and seed data
- CRUD-style workflows
- Asynchronous JavaScript
- Form validation
- Error handling
- Loading states
- UX/UI refinement
- Responsive design
- Git and GitHub
- API testing
- Cloud deployment
- Environment variables
- Production debugging
- Native Node.js dependency compatibility
- Cloud database/storage limitations

---

# 3MTT NextGen Capstone

ClinicQueue was developed as the **capstone project for the 3MTT NextGen
Software Development cohort**.

The project was a practical requirement for demonstrating the software
development skills acquired during the program and formed part of the
requirements for **Software Developer certification**.

The project brought together the development concepts learned during the
cohort into a complete application lifecycle:

```text
Planning
   ↓
Requirements
   ↓
UI Development
   ↓
Frontend Development
   ↓
Backend Development
   ↓
Database Integration
   ↓
API Testing
   ↓
UX/UI Polish
   ↓
Git/GitHub
   ↓
Deployment
   ↓
Production Testing
```

The completed application demonstrates the ability to move beyond
isolated coding exercises and build, test, deploy, and document a
working full-stack application.

---

# Project Status

## MVP Status

**Complete**

## Deployment Status

**Production deployment successful**

## Production Testing

**Passed**

## Current Architecture

```text
Frontend: React + Vite + Tailwind CSS
Backend: Node.js + Express
Database: SQLite
Frontend Hosting: Vercel
Backend Hosting: Render
Repository: GitHub
```

## Important Production Note

The current SQLite implementation is appropriate for the capstone MVP
and demonstration deployment, but a production healthcare system should
migrate to a managed persistent database such as PostgreSQL before
handling real-world patient data at scale.

---

# Author

**Yusuf Mamman**

Software Development Learner\
3MTT NextGen Software Development Cohort

**ClinicQueue --- Capstone Project**

---

## Acknowledgement

This project was developed as part of the **3MTT NextGen Software
Development program** and represents the practical application of
software development concepts learned during the cohort.
