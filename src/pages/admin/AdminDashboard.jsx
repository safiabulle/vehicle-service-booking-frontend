import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import MainLayout from "../../layouts/MainLayout";

import { getAppointments } from "../../services/appointmentService";
import { getServices } from "../../services/serviceService";
import { getUsers } from "../../services/accountService";

function AdminDashboard() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const appointmentData = await getAppointments();
        const serviceData = await getServices();
        const userData = await getUsers();

        setAppointments(appointmentData);
        setServices(serviceData);
        setUsers(userData);

        console.log("Appointments:", appointmentData);
        console.log("Users:", userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center py-10">Loading dashboard...</p>
      </MainLayout>
    );
  }

  const pendingBookings = appointments.filter(
    (appointment) => appointment.status === "PENDING"
  );

  const customers = users.filter(
    (user) => user.role === "CUSTOMER"
  );

  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back,
            <span className="font-semibold"> {user?.username}</span>
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow border p-6">
            <p className="text-gray-500 text-sm">
              Customers
            </p>

            <h2 className="text-4xl font-bold mt-3 text-blue-600">
              {customers.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow border p-6">
            <p className="text-gray-500 text-sm">
              Total Bookings
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              {appointments.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow border p-6">
            <p className="text-gray-500 text-sm">
              Pending Bookings
            </p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-500">
              {pendingBookings.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow border p-6">
            <p className="text-gray-500 text-sm">
              Available Services
            </p>

            <h2 className="text-4xl font-bold mt-3 text-red-500">
              {services.length}
            </h2>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-xl border shadow">

          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>
          </div>

          <div className="p-6 flex flex-wrap gap-4">

            <Link
              to="/appointments"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg"
            >
              Manage Bookings
            </Link>

            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              Manage Services
            </Link>

            <Link
              to="/payments"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              View Payments
            </Link>

          </div>

        </div>

        {/* Recent Bookings */}

        <div className="bg-white rounded-xl shadow border">

          <div className="flex justify-between items-center border-b p-6">

            <h2 className="text-2xl font-semibold">
              Recent Bookings
            </h2>

            <Link
              to="/appointments"
              className="text-blue-600 hover:underline"
            >
              View All
            </Link>

          </div>

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Service</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Vehicle</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {appointments.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500"
                  >
                    No bookings found.
                  </td>

                </tr>

              ) : (

                [...appointments]
                  .sort(
                    (a, b) =>
                      new Date(b.created_at) -
                      new Date(a.created_at)
                  )
                  .slice(0, 5)
                  .map((appointment) => (

                    <tr
                      key={appointment.id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4 font-medium">
                        {appointment.service_name}
                      </td>

                      <td className="p-4">
                        {appointment.customer_name}
                      </td>

                      <td className="p-4">
                        {appointment.vehicle_registration}
                      </td>

                      <td className="p-4">
                        {appointment.appointment_date}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

                      </td>

                    </tr>

                  ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </MainLayout>
  );
}

export default AdminDashboard;