import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import VehicleForm from "../../components/vehicles/VehicleForm";
import { createVehicle } from "../../services/vehicleService";

function AddVehicle() {
  const navigate = useNavigate();

  const handleCreate = async (vehicleData) => {
    try {
      await createVehicle(vehicleData);
      navigate("/vehicles");
    } catch (error) {
      console.error(error);
      alert("Failed to add vehicle.");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Add Vehicle</h1>

      <VehicleForm
        onSubmit={handleCreate}
        buttonText="Add Vehicle"
      />
    </MainLayout>
  );
}

export default AddVehicle;