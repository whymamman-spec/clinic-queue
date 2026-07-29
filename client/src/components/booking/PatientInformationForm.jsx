function PatientInformationForm({
  patientName,
  setPatientName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
}) {
  return (
    <>
      <hr className="my-10 border-slate-200" />

      <h2 className="text-2xl font-semibold text-slate-800">
        Patient Information
      </h2>

      <p className="mt-2 text-slate-600">
        Please provide your contact details so we can confirm your appointment.
      </p>

      <div className="mt-8 space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="patientName" className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            id="patientName"
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="08012345678"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email (Optional)
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  );
}

export default PatientInformationForm;
