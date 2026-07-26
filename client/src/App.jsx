import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Container from "./components/ui/Container";
import Input from "./components/ui/Input";

function App() {
  return (
    <main className="min-h-screen bg-slate-100 py-12">
      <Container>
        <div className="space-y-10">
          <header className="text-center">
            <h1 className="text-5xl font-bold text-blue-600">🏥 ClinicQueue</h1>

            <p className="mt-3 text-slate-600 text-lg">
              Design System Playground
            </p>
          </header>

          <Card>
            <h2 className="text-2xl font-semibold mb-6">Book Appointment</h2>

            <div className="space-y-5">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
              />

              <Input
                label="Phone Number"
                name="phone"
                placeholder="08012345678"
              />

              <div className="flex gap-4 flex-wrap">
                <Button>Book Appointment</Button>

                <Button variant="secondary">View Departments</Button>

                <Button variant="outline">Learn More</Button>

                <Button variant="danger">Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}

export default App;
