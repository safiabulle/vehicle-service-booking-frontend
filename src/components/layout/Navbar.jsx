import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-xl font-bold hover:text-blue-200 transition"
        >
          Vehicle Service Booking
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-200 transition"
          >
            Dashboard
          </Link>

          {user?.role === "CUSTOMER" && (
            <>
              <Link
                to="/vehicles"
                className="hover:text-blue-200 transition"
              >
                Vehicles
              </Link>

              <Link
                to="/services"
                className="hover:text-blue-200 transition"
              >
                Services
              </Link>

              <Link
                to="/appointments"
                className="hover:text-blue-200 transition"
              >
                My Appointments
              </Link>

              <Link
                to="/payments"
                className="hover:text-blue-200 transition"
              >
                My Payments
              </Link>
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/services"
                className="hover:text-blue-200 transition"
              >
                Manage Services
              </Link>

              <Link
                to="/appointments"
                className="hover:text-blue-200 transition"
              >
                Bookings
              </Link>

              <Link
                to="/payments"
                className="hover:text-blue-200 transition"
              >
                Payments
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;