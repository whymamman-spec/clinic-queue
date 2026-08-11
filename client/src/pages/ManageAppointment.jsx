import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { formatDate } from "../utils/formatDate";

import {
  getAppointmentByReference,
  cancelAppointment,
} from "../services/appointmentService";
import ConfirmationModal from "../components/ui/ConfirmationModal";

function ManageAppointment() {
  const [bookingReference, setBookingReference] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!bookingReference.trim()) {
      setError("Please enter your booking reference.");
      return;
    }

    setError("");
    setAppointment(null);
    setIsSearching(true);

    try {
      const data = await getAppointmentByReference(bookingReference);

      console.log(data);

      setAppointment(data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 404) {
        setError(
          "We couldn't find an appointment with that booking reference. Please check the reference and try again.",
        );
      } else {
        setError(
          "Unable to retrieve your appointment right now. Please try again later.",
        );
      }
    } finally {
      setIsSearching(false);
    }
  }

  async function handleCancel() {
    if (!appointment) return;

    setIsCancelling(true);

    try {
      await cancelAppointment(appointment.booking_reference);

      setAppointment({
        ...appointment,
        status: "Cancelled",
      });

      setShowCancelModal(false);

      toast.success("Appointment cancelled successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to cancel appointment.");
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <section className="container-custom py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-4xl font-bold text-center text-slate-800">
            Manage Appointment
          </h1>

          <p className="mt-4 text-center text-slate-600">
            Enter your booking reference to manage an existing appointment.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="bookingReference"
                className="block mb-2 font-medium"
              >
                Booking Reference
              </label>

              <input
                id="bookingReference"
                type="text"
                value={bookingReference}
                onChange={(event) =>
                  setBookingReference(event.target.value.toUpperCase())
                }
                placeholder="e.g. CQ-9QE4SB"
                className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className={`w-full rounded-lg px-4 py-3 font-semibold transition
  ${
    isSearching
      ? "bg-blue-300 cursor-not-allowed text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}
            >
              {isSearching ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Searching...
                </span>
              ) : (
                "Find Appointment"
              )}
            </button>
          </form>

          {error && (
            <div
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5"
              role="alert"
            >
              <div className="flex items-start gap-3">
                <div className="text-xl" aria-hidden="true">
                  ⚠️
                </div>

                <div>
                  <p className="font-semibold text-red-800">
                    Unable to find appointment
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {appointment && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Appointment Details
              </h2>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Booking Reference:</span>{" "}
                  {appointment.booking_reference}
                </div>

                <div>
                  <span className="font-semibold">Patient:</span>{" "}
                  {appointment.patient_name}
                </div>

                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {appointment.phone}
                </div>

                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {appointment.email || "Not provided"}
                </div>

                <div>
                  <span className="font-semibold">Department:</span>{" "}
                  {appointment.department_name}
                </div>

                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  {formatDate(appointment.appointment_date)}
                </div>

                <div>
                  <span className="font-semibold">Time:</span>{" "}
                  {appointment.appointment_time}
                </div>

                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => setShowCancelModal(true)}
                      disabled={
                        appointment.status === "Cancelled" || isCancelling
                      }
                      className={`w-full rounded-lg py-3 font-semibold transition ${
                        appointment.status === "Cancelled"
                          ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {isCancelling ? (
                        <span className="flex items-center justify-center gap-2">
                          <LoadingSpinner />
                          Cancelling...
                        </span>
                      ) : appointment.status === "Cancelled" ? (
                        "Appointment Cancelled"
                      ) : (
                        "Cancel Appointment"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!appointment && !error && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="text-4xl" aria-hidden="true">
                📋
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-800">
                Check your appointment
              </h2>

              <p className="mt-2 text-slate-600">
                Enter the booking reference you received when you booked your
                appointment to view its details or cancel it.
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Keep Appointment"
        onConfirm={handleCancel}
        onCancel={() => setShowCancelModal(false)}
        isLoading={isCancelling}
      />
    </section>
  );
}

export default ManageAppointment;
