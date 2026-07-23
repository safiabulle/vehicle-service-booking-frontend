import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../../layouts/MainLayout";

import { getVehicles } from "../../services/vehicleService";
import { getAppointments } from "../../services/appointmentService";

function Dashboard() {
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const vehicleData = await getVehicles();
        const appointmentData = await getAppointments();

        setVehicles(vehicleData);
        setAppointments(appointmentData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading dashboard...</p>
      </MainLayout>
    );
  }

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING"
  );

  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back,
            <span className="font-semibold"> {user?.username}</span>.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <p className="text-4xl font-bold text-blue-600">
              {vehicles.length}
            </p>

            <p className="text-gray-500 mt-2">
              My Vehicles
            </p>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <p className="text-4xl font-bold text-green-600">
              {appointments.length}
            </p>

            <p className="text-gray-500 mt-2">
              Total Bookings
            </p>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <p className="text-4xl font-bold text-yellow-500">
              {pendingAppointments.length}
            </p>

            <p className="text-gray-500 mt-2">
              Pending Bookings
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-xl border shadow-sm p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/appointments/book"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Book Appointment
            </Link>

            <Link
              to="/vehicles/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Add Vehicle
            </Link>

            <Link
              to="/services"
              className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-lg"
            >
              Browse Services
            </Link>

          </div>

        </div>

        {/* Recent Appointments */}

        <div className="bg-white rounded-xl border shadow-sm">

          <div className="flex justify-between items-center p-6 border-b">

            <h2 className="text-2xl font-semibold">
              Recent Appointments
            </h2>

            <Link
              to="/appointments"
              className="text-blue-600 font-medium hover:underline"
            >
              View All
            </Link>

          </div>

          {appointments.length === 0 ? (

            <div className="p-12 text-center text-gray-500">
              No appointments found.
            </div>

          ) : (

            <div className="divide-y">

              {appointments.slice(0, 5).map((appointment) => (

                <div
                  key={appointment.id}
                  className="flex justify-between items-center p-5"
                >

                  <div>

                    <h3 className="font-semibold text-lg">
                      {appointment.service_name}
                    </h3>

                    <p className="text-gray-500">
                      {appointment.vehicle_registration}
                    </p>

                  </div>

                  <div className="text-gray-600">
                    {appointment.appointment_date}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      appointment.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : appointment.status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-700"
                        : appointment.status === "COMPLETED"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {appointment.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;