import { useEffect, useState } from "react";
import { getVehicles } from "../../services/vehicleService";
import { getServices } from "../../services/serviceService";

function AppointmentForm({ initialData, onSubmit, buttonText }) {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    vehicle: "",
    service: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleData = await getVehicles();
        const serviceData = await getServices();

        setVehicles(vehicleData);
        setServices(serviceData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        vehicle: initialData.vehicle || "",
        service: initialData.service || "",
        appointment_date: initialData.appointment_date || "",
        appointment_time: initialData.appointment_time || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <select
        name="vehicle"
        value={formData.vehicle}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      >
        <option value="">Select Vehicle</option>

        {vehicles.map((vehicle) => (
          <option
            key={vehicle.id}
            value={vehicle.id}
          >
            {vehicle.make} {vehicle.model} (
            {vehicle.registration_number})
          </option>
        ))}
      </select>

      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      >
        <option value="">Select Service</option>

        {services.map((service) => (
          <option
            key={service.id}
            value={service.id}
          >
            {service.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="appointment_date"
        value={formData.appointment_date}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="time"
        name="appointment_time"
        value={formData.appointment_time}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <textarea
        name="notes"
        placeholder="Additional notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border rounded p-3"
        rows="4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default AppointmentForm;