import { useEffect, useState } from "react";

import { getDepartments } from "../services/departmentService";
import {
  getAvailableSlots,
  createAppointment,
} from "../services/appointmentService";

import DepartmentSelect from "../components/booking/DepartmentSelect";
import DatePicker from "../components/booking/DatePicker";
import TimeSlotGrid from "../components/booking/TimeSlotGrid";
import PatientInformationForm from "../components/booking/PatientInformationForm";

function BookAppointment() {
  // -----------------------------
  // State
  // -----------------------------
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -----------------------------
  // Fetch Departments
  // -----------------------------
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load departments.");
      } finally {
        setLoading(false);
      }
    }

    fetchDepartments();
  }, []);

  // -----------------------------
  // Fetch Available Slots
  // -----------------------------
  useEffect(() => {
    async function fetchAvailableSlots() {
      if (!selectedDepartment || !selectedDate) {
        setAvailableSlots([]);
        return;
      }

      try {
        const data = await getAvailableSlots(selectedDepartment, selectedDate);

        setAvailableSlots(data.availableSlots);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAvailableSlots();
  }, [selectedDepartment, selectedDate]);

  const selectedDepartmentData = departments.find(
    (department) => department.id === Number(selectedDepartment),
  );

  // -----------------------------
  // Handle Form Submission
  // -----------------------------
  async function handleSubmit(event) {
    event.preventDefault();

    setValidationError("");

    if (!selectedDepartment) {
      setValidationError("Please select a department.");
      return;
    }

    if (!selectedDate) {
      setValidationError("Please select an appointment date.");
      return;
    }

    if (!selectedTime) {
      setValidationError("Please select an appointment time.");
      return;
    }

    if (!patientName.trim()) {
      setValidationError("Please enter your full name.");
      return;
    }

    if (!phoneNumber.trim()) {
      setValidationError("Please enter your phone number.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await createAppointment({
        patient_name: patientName,
        phone: phoneNumber,
        email,
        department_id: Number(selectedDepartment),
        appointment_date: selectedDate,
        appointment_time: selectedTime,
      });

      console.log(result);

      setBookingSuccess(result);

      setValidationError("");
    } catch (error) {
      console.error(error);

      setValidationError(
        error.response?.data?.message || "Unable to book appointment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading) {
    return (
      <div className="container-custom py-20">
        <h2 className="text-2xl font-semibold">Loading departments...</h2>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------
  if (error) {
    return (
      <div className="container-custom py-20">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  // -----------------------------
  // Booking Success
  // -----------------------------
  if (bookingSuccess) {
    return (
      <section className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-10 text-center">
            <div className="text-6xl mb-6">✅</div>

            <h1 className="text-3xl font-bold text-green-700">
              Appointment Booked Successfully
            </h1>

            <p className="mt-4 text-slate-600">
              Your appointment has been confirmed.
            </p>

            <div className="mt-8 rounded-lg bg-slate-100 p-6">
              <p className="text-sm text-slate-500">Booking Reference</p>

              <p className="mt-2 text-3xl font-bold tracking-wider text-blue-700">
                {bookingSuccess.booking_reference}
              </p>
            </div>

            <div className="mt-8 space-y-4 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Department</span>
                <span>{selectedDepartmentData?.name}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Appointment Date</span>
                <span>{selectedDate}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Appointment Time</span>
                <span>{selectedTime}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Patient</span>
                <span>{patientName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Phone</span>
                <span>{phoneNumber}</span>
              </div>
            </div>

            <p className="mt-8 text-slate-600">
              Please arrive at least
              <strong> 15 minutes early </strong>
              with a valid means of identification.
            </p>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(null);
                  setSelectedDepartment("");
                  setSelectedDate("");
                  setSelectedTime("");
                  setPatientName("");
                  setPhoneNumber("");
                  setEmail("");
                  setValidationError("");
                }}
                className={`w-full rounded-lg py-3 font-semibold transition ${
                  isSubmitting
                    ? "bg-blue-300 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-slate-800 text-center">
              Book an Appointment
            </h1>

            <p className="mt-4 text-slate-600 text-center max-w-xl mx-auto">
              Select your preferred department, appointment date, and an
              available time slot before entering your contact information.
            </p>

            <DepartmentSelect
              departments={departments}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
            />

            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <TimeSlotGrid
              selectedDepartment={selectedDepartment}
              selectedDate={selectedDate}
              availableSlots={availableSlots}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />

            <PatientInformationForm
              patientName={patientName}
              setPatientName={setPatientName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
            />

            {validationError && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                {validationError}
              </div>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700"
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookAppointment;
