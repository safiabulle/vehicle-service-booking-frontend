import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ServiceForm from "../../components/services/ServiceForm";
import { createService } from "../../services/serviceService";

function AddService() {
  const navigate = useNavigate();

  const handleCreate = async (serviceData) => {
    try {
      await createService(serviceData);
      navigate("/services");
    } catch (error) {
      console.error(error);
      alert("Failed to add service.");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Add Service
      </h1>

      <ServiceForm
        onSubmit={handleCreate}
        buttonText="Add Service"
      />
    </MainLayout>
  );
}

export default AddService;