function DatePicker({ selectedDate, setSelectedDate }) {
  return (
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
  );
}

export default DatePicker;
