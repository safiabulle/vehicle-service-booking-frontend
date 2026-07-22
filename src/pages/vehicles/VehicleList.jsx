import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVehicles, deleteVehicle } from "../../services/vehicleService";
import MainLayout from "../../layouts/MainLayout";
import VehicleCard from "../../components/vehicles/VehicleCard";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVehicle(id);
      fetchVehicles();
    } catch (error) {
      console.error(error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Vehicles</h1>

        <Link
          to="/vehicles/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default VehicleList;