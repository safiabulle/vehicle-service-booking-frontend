import { Link } from "react-router-dom";

function VehicleCard({ vehicle, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <h2 className="text-2xl font-semibold">
        {vehicle.make} {vehicle.model}
      </h2>

      <div className="mt-3 space-y-2">
        <p>
          <strong>Registration:</strong> {vehicle.registration_number}
        </p>

        <p>
          <strong>Year:</strong> {vehicle.year}
        </p>

        <p>
          <strong>Color:</strong> {vehicle.color}
        </p>

        {vehicle.vin && (
          <p>
            <strong>VIN:</strong> {vehicle.vin}
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Link
          to={`/vehicles/edit/${vehicle.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(vehicle.id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;