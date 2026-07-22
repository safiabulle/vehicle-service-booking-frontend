import { useState, useEffect } from "react";

function VehicleForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registration_number: "",
    color: "",
    vin: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        make: initialData.make || "",
        model: initialData.model || "",
        year: initialData.year || "",
        registration_number: initialData.registration_number || "",
        color: initialData.color || "",
        vin: initialData.vin || "",
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
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="text"
        name="registration_number"
        placeholder="Registration Number"
        value={formData.registration_number}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="text"
        name="vin"
        placeholder="VIN (Optional)"
        value={formData.vin}
        onChange={handleChange}
        className="w-full border rounded p-3"
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

export default VehicleForm;