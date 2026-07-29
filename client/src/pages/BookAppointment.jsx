import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";
import { getAvailableSlots } from "../services/appointmentService";
import DepartmentSelect from "../components/booking/DepartmentSelect";
import DatePicker from "../components/booking/DatePicker";
import TimeSlotGrid from "../components/booking/TimeSlotGrid";

function BookAppointment() {
  // -----------------------------
  // State
  // -----------------------------
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // Fetch departments
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
  // Fetch available slots
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

  // -----------------------------
  // Loading State
  // -----------------------------
  if (loading) {
    return (
      <div className="container-custom py-20">
        <h2 className="text-2xl font-semibold">Loading departments...</h2>
      </div>
    );
  }

  // -----------------------------
  // Error State
  // -----------------------------
  if (error) {
    return (
      <div className="container-custom py-20">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <section className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-4xl font-bold text-slate-800 text-center">
            Book an Appointment
          </h1>

          <p className="mt-4 text-slate-600 text-center max-w-xl mx-auto">
            Select your preferred department, appointment date, and an available
            time slot before entering your contact information.
          </p>

          {/* Department */}
          <DepartmentSelect
            departments={departments}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />

          {/* Appointment Date */}
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          {/* Available Slots */}
          <TimeSlotGrid
            selectedDepartment={selectedDepartment}
            selectedDate={selectedDate}
            availableSlots={availableSlots}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          {/* Divider */}
          <hr className="my-10 border-slate-200" />

          {/* Patient Information */}
          <h2 className="text-2xl font-semibold text-slate-800">
            Patient Information
          </h2>

          <p className="mt-2 text-slate-600">
            Please provide your contact details so we can confirm your
            appointment.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>

              <p className="text-slate-400 italic">
                (Input field coming next lesson)
              </p>
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone Number</label>

              <p className="text-slate-400 italic">
                (Input field coming next lesson)
              </p>
            </div>

            <div>
              <label className="block mb-2 font-medium">Email (Optional)</label>

              <p className="text-slate-400 italic">
                (Input field coming next lesson)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookAppointment;
