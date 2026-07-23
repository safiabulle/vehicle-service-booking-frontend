import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updatePayment } from "../../services/paymentService";

function PaymentCard({ payment }) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState(
  payment.payment_method || "CASH"
);

const [reference, setReference] = useState(
  payment.transaction_reference || ""
);

  const handleMarkAsPaid = async () => {
  try {
    await updatePayment(payment.id, {
      payment_method: paymentMethod,
      payment_status: "PAID",
      transaction_reference:
        paymentMethod === "CASH" ? "" : reference,
    });

    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to update payment.");
  }
};

  return (
    <div className="bg-white rounded-lg shadow-md border p-6">
      <h2 className="text-2xl font-bold mb-4">
        {payment.service_name}
      </h2>

      {user?.role === "ADMIN" && (
        <p>
          <strong>Customer:</strong> {payment.appointment_customer}
        </p>
      )}

      <p>
        <strong>Vehicle:</strong> {payment.vehicle_registration}
      </p>

      <p>
        <strong>Appointment Date:</strong> {payment.appointment_date}
      </p>

      <p>
        <strong>Amount:</strong> KES {payment.amount}
      </p>

     <p>
      <strong>Payment Method:</strong>{" "}
      {payment.payment_method || "Not selected"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            payment.payment_status === "PAID"
              ? "text-green-600"
              : payment.payment_status === "FAILED"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {payment.payment_status}
        </span>
      </p>

      {payment.transaction_reference && (
      <p>
        <strong>Reference:</strong>{" "}
        {payment.transaction_reference}
      </p>
    )}

      <p className="text-sm text-gray-500 mt-3">
        {new Date(payment.payment_date).toLocaleString()}
      </p>

      {user?.role === "ADMIN" &&
  payment.payment_status === "PENDING" && (
    <div className="mt-5 border-t pt-4">

      <label className="block font-semibold mb-2">
        Payment Method
      </label>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border rounded w-full p-2 mb-3"
      >
        <option value="CASH">Cash</option>
        <option value="MPESA">M-Pesa</option>
        <option value="CARD">Card</option>
      </select>

      {paymentMethod !== "CASH" && (
        <>
          <label className="block font-semibold mb-2">
            Transaction Reference
          </label>

          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Enter transaction reference"
            className="border rounded w-full p-2 mb-4"
          />
        </>
      )}

      <button
        onClick={handleMarkAsPaid}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Mark as Paid
      </button>
    </div>
)}
    </div>
  );
}

export default PaymentCard;