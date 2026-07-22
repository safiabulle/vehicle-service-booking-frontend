import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Vehicle Service Booking
        </h1>

        <div className="flex gap-6 items-center">
          <Link to="/">Dashboard</Link>

          <Link to="/vehicles">Vehicles</Link>

          <Link to="/services">Services</Link>

          <Link to="/appointments">Appointments</Link>

          <Link to="/payments">Payments</Link>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;