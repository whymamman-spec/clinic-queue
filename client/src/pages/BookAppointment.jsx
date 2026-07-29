import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";
import { getAvailableSlots } from "../services/appointmentService";

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
          <div className="mt-10">
            <label htmlFor="department" className="block mb-2 font-medium">
              Department
            </label>

            <select
              id="department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a Department --</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Date */}
          <div className="mt-8">
            <label htmlFor="appointmentDate" className="block mb-2 font-medium">
              Appointment Date
            </label>

            <input
              type="date"
              id="appointmentDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Available Slots */}
          <div className="mt-8">
            <label className="block mb-3 font-medium">
              Available Time Slots
            </label>

            {!selectedDepartment || !selectedDate ? (
              <p className="text-slate-500">
                Select a department and date to view available slots.
              </p>
            ) : availableSlots.length === 0 ? (
              <p className="text-red-600">
                No appointment slots are available for this date.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-lg border p-3 font-medium transition ${
                      selectedTime === slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-blue-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>

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
