import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ServiceForm from "../../components/services/ServiceForm";
import {
  getService,
  updateService,
} from "../../services/serviceService";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getService(id);
        setService(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleUpdate = async (serviceData) => {
    try {
      await updateService(id, serviceData);
      navigate("/services");
    } catch (error) {
      console.error(error);
      alert("Failed to update service.");
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
        Edit Service
      </h1>

      <ServiceForm
        initialData={service}
        onSubmit={handleUpdate}
        buttonText="Update Service"
      />
    </MainLayout>
  );
}

export default EditService;