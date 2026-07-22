import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import VehicleForm from "../../components/vehicles/VehicleForm";
import {
  getVehicle,
  updateVehicle,
} from "../../services/vehicleService";

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicle(id);
        setVehicle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleUpdate = async (vehicleData) => {
    try {
      await updateVehicle(id, vehicleData);
      navigate("/vehicles");
    } catch (error) {
      console.error(error);
      alert("Failed to update vehicle.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Edit Vehicle
      </h1>

      <VehicleForm
        initialData={vehicle}
        onSubmit={handleUpdate}
        buttonText="Update Vehicle"
      />
    </MainLayout>
  );
}

export default EditVehicle;