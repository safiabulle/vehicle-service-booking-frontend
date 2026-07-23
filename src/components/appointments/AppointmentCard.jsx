import { useAuth } from "../../context/AuthContext";
import { updateAppointment } from "../../services/appointmentService";

function AppointmentCard({ appointment }) {
  const { user } = useAuth();

  const changeStatus = async (newStatus) => {
    try {
      await updateAppointment(appointment.id, {
        vehicle: appointment.vehicle,
        service: appointment.service,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        notes: appointment.notes,
        status: newStatus,
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update appointment.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border">
      <h2 className="text-xl font-semibold mb-3">
        {appointment.service_name}
      </h2>

      {user?.role === "ADMIN" && (
        <p>
          <strong>Customer:</strong>{" "}
          {appointment.customer_name}
        </p>
      )}

      <p>
        <strong>Vehicle:</strong>{" "}
        {appointment.vehicle_registration}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {appointment.appointment_date}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {appointment.appointment_time}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className="font-semibold">
          {appointment.status}
        </span>
      </p>

      {appointment.notes && (
        <p className="mt-2">
          <strong>Notes:</strong>{" "}
          {appointment.notes}
        </p>
      )}

      {/* Customer Actions */}
      {user?.role !== "ADMIN" &&
        appointment.status === "PENDING" && (
          <button
            onClick={() => changeStatus("CANCELLED")}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancel Appointment
          </button>
        )}

      {/* Admin Actions */}
      {user?.role === "ADMIN" && (
        <div className="flex flex-wrap gap-2 mt-4">
          {appointment.status === "PENDING" && (
            <>
              <button
                onClick={() => changeStatus("APPROVED")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => changeStatus("CANCELLED")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </>
          )}

          {appointment.status === "APPROVED" && (
            <button
              onClick={() => changeStatus("IN_PROGRESS")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Start Service
            </button>
          )}

          {appointment.status === "IN_PROGRESS" && (
            <button
              onClick={() => changeStatus("COMPLETED")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Complete Service
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;