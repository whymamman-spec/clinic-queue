function TimeSlotGrid({
  selectedDepartment,
  selectedDate,
  availableSlots,
  selectedTime,
  setSelectedTime,
}) {
  return (
    <div className="mt-8">
      <label className="block mb-3 font-medium">Available Time Slots</label>

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
  );
}

export default TimeSlotGrid;
