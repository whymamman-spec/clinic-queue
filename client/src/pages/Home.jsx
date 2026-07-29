import { useEffect } from "react";

import { getDepartments } from "../services/departmentService";

function Home() {
  useEffect(() => {
    async function testConnection() {
      try {
        const departments = await getDepartments();

        console.log("Departments:");

        console.log(departments);
      } catch (error) {
        console.error(error);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="container-custom py-20">
      <h1 className="text-4xl font-bold">ClinicQueue</h1>

      <p className="mt-4">Testing backend connection...</p>
    </div>
  );
}

export default Home;
