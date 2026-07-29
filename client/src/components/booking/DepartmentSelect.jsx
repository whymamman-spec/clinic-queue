function DepartmentSelect({
  departments,
  selectedDepartment,
  setSelectedDepartment,
}) {
  return (
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
  );
}

export default DepartmentSelect;
