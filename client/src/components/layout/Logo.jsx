import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 hover:opacity-90 transition"
    >
      <span className="text-3xl">🏥</span>

      <div>
        <h1 className="text-xl font-bold text-blue-600">ClinicQueue</h1>

        <p className="text-xs text-slate-500">Skip the Queue</p>
      </div>
    </Link>
  );
}

export default Logo;
