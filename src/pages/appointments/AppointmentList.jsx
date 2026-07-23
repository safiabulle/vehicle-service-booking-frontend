import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import { getAppointments } from "../../services/appointmentService";
import { useAuth } from "../../context/AuthContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {user?.role === "ADMIN"
            ? "All Appointments"
            : "My Appointments"}
        </h1>

        {user?.role === "CUSTOMER" && (
          <Link
            to="/appointments/book"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Book Appointment
          </Link>
        )}
      </div>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default AppointmentList;