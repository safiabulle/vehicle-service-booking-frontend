import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import { createAppointment } from "../../services/appointmentService";

function BookAppointment() {
  const navigate = useNavigate();

  const handleCreate = async (appointmentData) => {
    try {
      await createAppointment(appointmentData);
      navigate("/appointments");
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <AppointmentForm
        onSubmit={handleCreate}
        buttonText="Book Appointment"
      />
    </MainLayout>
  );
}

export default BookAppointment;