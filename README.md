# 🏥 ClinicQueue

> A full-stack clinic appointment booking system designed to help Nigerian clinics reduce long queues and improve the patient appointment experience.

ClinicQueue allows patients to view available departments, select appointment dates and available time slots, book appointments, receive a unique booking reference, and later look up or cancel their appointments.

---

## 🎓 Project Context

**ClinicQueue is the capstone project for the 3MTT NextGen Software Development cohort.**

The project was developed as a practical demonstration of the skills acquired during the cohort and forms part of the requirements for certification as a **Software Developer**.

Rather than building only a demonstration interface, the project was developed as a functional **Minimum Viable Product (MVP)** with a React frontend, Express backend, and SQLite database.

---

# 📌 Problem Statement

Many healthcare facilities experience long queues and extended waiting times because patients often have to physically visit a clinic before knowing when they can be attended to.

This can result in:

- Long waiting times
- Overcrowded reception areas
- Inefficient appointment scheduling
- Difficulty managing available appointment slots
- Poor visibility into existing appointments
- Unnecessary trips to healthcare facilities

ClinicQueue addresses this problem by providing a simple digital appointment-booking workflow.

---

# 💡 Solution

ClinicQueue provides a centralized appointment booking system where patients can:

1. Select a medical department.
2. Select an appointment date.
3. View available appointment time slots.
4. Enter their personal/contact information.
5. Book an appointment.
6. Receive a unique booking reference.
7. Look up an existing appointment using that reference.
8. Cancel an appointment when necessary.
9. View the updated appointment status after cancellation.

The system automatically removes booked time slots from availability while making cancelled slots available for future bookings.

---

# 🎯 Minimum Viable Product (MVP)

The project was planned and delivered around a focused MVP rather than attempting to build a complete hospital management system.

### MVP 1 — Department & Appointment Discovery

Patients can:

- View available clinic departments.
- Select a department.
- Select an appointment date.
- View available appointment slots.

### MVP 2 — Appointment Booking

Patients can:

- Enter their name.
- Enter their phone number.
- Optionally provide an email address.
- Select a department, date, and time.
- Submit an appointment request.
- Receive a unique booking reference.

### MVP 3 — Appointment Availability Management

The backend:

- Generates appointment time slots.
- Checks existing bookings.
- Prevents duplicate bookings for the same department, date, and time.
- Removes booked slots from availability.
- Makes cancelled slots available again.

### MVP 4 — Appointment Lookup

Patients can use their booking reference to retrieve:

- Booking reference
- Patient name
- Phone number
- Email
- Department
- Appointment date
- Appointment time
- Appointment status

### MVP 5 — Appointment Cancellation

Patients can:

- Initiate cancellation.
- Confirm cancellation through a custom confirmation modal.
- Receive feedback through toast notifications.
- See their appointment status change to `Cancelled`.
- Look up the cancelled appointment again.

### MVP 6 — User Experience & Responsive Design

The application includes:

- Responsive layouts
- Mobile, tablet and desktop support
- Loading indicators
- Form validation
- Error states
- Empty states
- Toast notifications
- Confirmation modal
- Accessible error messaging
- Disabled controls during asynchronous operations

---

# ✅ MVP Delivery

All planned core MVP functionality was implemented and tested.

The final acceptance test successfully verified the complete workflow:

```text
Select Department
        ↓
Select Date
        ↓
View Available Slots
        ↓
Book Appointment
        ↓
Receive Booking Reference
        ↓
Look Up Appointment
        ↓
View Appointment Details
        ↓
Cancel Appointment
        ↓
Confirmation Modal
        ↓
Appointment Status → Cancelled
        ↓
Look Up Appointment Again
        ↓
Cancelled Appointment Retrieved Successfully

#🛠️ Technology Stack
Frontend
React
Vite
Tailwind CSS
React Router
Axios
Lucide React
React Hot Toast
Backend
Node.js
Express.js
SQLite
SQLite3
sqlite database wrapper
CORS
dotenv
Development Tools
Visual Studio Code
Git
GitHub
Thunder Client
DB Browser for SQLite

#🏗️ Application Architecture

ClinicQueue follows a client-server architecture.

                    ┌─────────────────────┐
                    │      Patient        │
                    │     Web Browser     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  Vite + Tailwind    │
                    │  React Router       │
                    │  Axios              │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │                     │
                    │  Routes             │
                    │  Controllers        │
                    │  Utilities          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   SQLite Database   │
                    │                     │
                    │  Departments        │
                    │  Appointments       │
                    └─────────────────────┘
#📂 Project Structure
ClinicQueue/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── booking/
│   │   │   ├── layout/
│   │   │   └── ui/
|   |   |   └──appointment/
│   │   │
│   │   ├── constants/
|   |   ├── context/
|   |   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── database/
│   └── package.json
│   └── ...
├── .gitignore
└── README.md

#🔌 API Endpoints
Departments
Get all departments
GET /api/departments

Returns the available clinic departments.

Appointment Availability
Get available appointment slots
GET /api/appointments/available-slots

Query parameters:

departmentId
date

Example:

GET /api/appointments/available-slots?departmentId=3&date=2026-08-01
Create Appointment
POST /api/appointments

Example request body:

{
  "patient_name": "John Doe",
  "phone": "08012345678",
  "email": "john@example.com",
  "department_id": 3,
  "appointment_date": "2026-08-01",
  "appointment_time": "09:00"
}
Find Appointment
GET /api/appointments/:bookingReference

Example:

GET /api/appointments/CQ-9QE4SB
Cancel Appointment
PATCH /api/appointments/:bookingReference/cancel

Example:

PATCH /api/appointments/CQ-9QE4SB/cancel

#🔐 Appointment Booking Logic

ClinicQueue uses a booking-reference-based appointment management system.

When an appointment is created:

The selected department is verified.
The requested time is validated.
The system checks whether the slot is already booked.
A unique booking reference is generated.
The appointment is stored with a Confirmed status.

When an appointment is cancelled:

The appointment is located using its booking reference.
Its status is changed to Cancelled.
The appointment remains available for lookup.
Its time slot becomes available for future booking.

This ensures that cancellation does not destroy the appointment record.

#🧪 Testing

The application was tested through both frontend interaction and API testing.

Testing included:

Department retrieval
Available slot retrieval
Appointment creation
Duplicate booking prevention
Booking reference generation
Appointment lookup
Invalid booking references
Empty booking references
Appointment cancellation
Cancelled appointment lookup
Loading states
Error states
Toast notifications
Confirmation modal
Responsive layouts

API endpoints were tested during development using Thunder Client.

The SQLite database was also inspected during development to verify appointment records and status changes.

#📱 Responsive Design

ClinicQueue was tested across:

Mobile — approximately 375px width
Tablet — approximately 768px width
Desktop — approximately 1440px width

The application uses responsive Tailwind CSS utilities to provide an appropriate experience across different screen sizes.

#🎨 User Experience Features

The application includes several UX improvements beyond the basic MVP:

Loading spinners for asynchronous actions
Disabled buttons during requests
Success toast notifications
Error toast notifications
Custom cancellation confirmation modal
Empty appointment state
Friendly validation messages
Accessible error alerts
Appointment status badges
Responsive navigation
Responsive forms and cards


#🚀 Running the Project Locally
Prerequisites

Make sure you have installed:

Node.js
npm
Git
1. Clone the repository
git clone https://github.com/whymamman-spec/clinic-queue.git

Then:

cd clinic-queue
2. Install backend dependencies

From the project root:

npm install
3. Install frontend dependencies
cd client
npm install
4. Start the backend

From the project root:

npm run dev

The backend runs on:

http://localhost:5000
5. Start the frontend

Open another terminal:

cd client
npm run dev

Vite will provide the frontend URL, normally:

http://localhost:5173

Open that address in your browser.

⚙️ Environment Variables

If environment variables are required, create an appropriate .env file based on the project's configuration.

Do not commit sensitive credentials or private configuration files to GitHub.

#🔮 Future Improvements

ClinicQueue's MVP intentionally focuses on the core appointment workflow.

Potential future improvements include:

Patient accounts and authentication
Doctor/staff accounts
Clinic administrator dashboard
Doctor availability management
SMS appointment reminders
Email notifications
Appointment rescheduling
Multiple clinic locations
Patient appointment history
Admin analytics dashboard
Role-based access control
PostgreSQL or another production database
Production deployment
Automated testing
Advanced appointment scheduling rules

These features are outside the current MVP scope.

#📚 Learning Outcomes

This project provided practical experience with:

React component architecture
React state management
React Router
Form handling and validation
REST API integration
Axios
Express.js
API route design
Controller architecture
SQLite database operations
CRUD-style operations
Database queries
Booking conflict detection
Error handling
Asynchronous JavaScript
Responsive UI development
Tailwind CSS
Git and GitHub
API testing
Debugging full-stack applications
User experience design
Software project structure

#🎓 3MTT NextGen Capstone

This project was developed as the capstone project for the 3MTT NextGen Software Development cohort.

It represents the practical application of software development concepts learned during the program and was developed to satisfy the capstone requirement associated with the Software Developer certification pathway.

The project emphasizes not only writing code, but also:

Problem identification
MVP definition
Solution design
Frontend development
Backend development
Database design
API development
Testing
Debugging
User experience
Version control
Project documentation
Software delivery

#👨‍💻 Author

Yusuf Mamman

Software Developer | Data Analyst | GIS Learner

GitHub:

https://github.com/whymamman-spec

#📄 Project Status

Status: MVP Complete ✅

Project Type: Full-Stack Web Application

Purpose: 3MTT NextGen Software Development Capstone Project

Certification Context: Software Developer Certification Requirement

#⭐ Acknowledgements

Developed as part of the 3MTT NextGen Software Development program.

Built with the goal of applying software development skills to a practical problem affecting healthcare appointment management.
```
