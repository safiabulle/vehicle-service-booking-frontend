import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ServiceCard from "../../components/services/ServiceCard";
import {
  getServices,
  deleteService,
} from "../../services/serviceService";
import { useAuth } from "../../context/AuthContext";
function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      await deleteService(id);
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Failed to delete service.");
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
        <h1 className="text-3xl font-bold">
            Available Services
        </h1>

        {user?.role === "ADMIN" && (
            <Link
            to="/services/add"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            Add Service
            </Link>
        )}
        </div>

      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default ServiceList;