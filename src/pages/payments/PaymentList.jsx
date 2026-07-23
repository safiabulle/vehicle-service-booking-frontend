import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PaymentCard from "../../components/payments/PaymentCard";
import { getPayments } from "../../services/paymentService";

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

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
        My Payments
      </h1>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default PaymentList;