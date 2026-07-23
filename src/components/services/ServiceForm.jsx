import { useEffect, useState } from "react";
import { getCategories } from "../../services/serviceService";

function ServiceForm({ initialData, onSubmit, buttonText }) {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    estimated_duration: "",
    is_available: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || "",
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        estimated_duration: initialData.estimated_duration || "",
        is_available: initialData.is_available,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded p-3"
        rows="4"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="number"
        name="estimated_duration"
        placeholder="Estimated Duration (minutes)"
        value={formData.estimated_duration}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_available"
          checked={formData.is_available}
          onChange={handleChange}
        />

        Available
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default ServiceForm;