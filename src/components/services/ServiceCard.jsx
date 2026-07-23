import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ServiceCard({ service, onDelete }) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <h2 className="text-2xl font-semibold">{service.name}</h2>

      <p className="mt-2">
        <strong>Category:</strong> {service.category_name}
      </p>

      <p>
        <strong>Price:</strong> KES {service.price}
      </p>

      <p>
        <strong>Duration:</strong> {service.estimated_duration} minutes
      </p>

      <p className="mt-3 text-gray-700">
        {service.description}
      </p>

      {/* Admin Only */}
      {user?.role === "ADMIN" && (
        <div className="flex gap-3 mt-6">
          <Link
            to={`/services/edit/${service.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(service.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceCard;