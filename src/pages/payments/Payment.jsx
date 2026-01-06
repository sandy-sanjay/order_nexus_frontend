import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import paymentApi from "../../api/paymentApi";

function Payments() {
  const location = useLocation();

  // data coming from CreateOrder
  const orderId = location.state?.orderId || "";
  const amount = location.state?.amount || "";

  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);

  // 💳 Make payment (JWT sent automatically)
  const payNow = (e) => {
    e.preventDefault();

    if (paymentDone) return;

    setLoading(true);

    // ✅ CORRECT API CALL
    paymentApi
      .pay({
        orderId: Number(orderId),
        amount: Number(amount),
      })
      .then(() => {
        setPaymentDone(true);
        toast.success("Payment successful 🎉");

        // 🔔 update dashboard + notifications
        window.dispatchEvent(new Event("refreshNotifications"));
        window.dispatchEvent(new Event("refreshDashboard"));
      })
      .catch(() => {
        toast.error("Payment failed ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            textAlign: "center",
            color: "#333",
          }}
        >
          💳 Make Payment
        </h1>

        <form onSubmit={payNow}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", color: "#555" }}>
              Order ID
            </label>
            <input
              value={orderId}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#f1f1f1",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "600", color: "#555" }}>
              Amount (₹)
            </label>
            <input
              value={amount}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#f1f1f1",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={paymentDone || loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "none",
              background: paymentDone
                ? "#4caf50"
                : loading
                ? "#999"
                : "#111",
              color: "#fff",
              cursor: paymentDone || loading ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
          >
            {paymentDone
              ? "✔ Payment Successful"
              : loading
              ? "Processing..."
              : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payments;
