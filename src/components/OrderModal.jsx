import React from "react";

function OrderModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Order Details</h3>
        <hr />

        <p><b>Order ID:</b> {order.id}</p>
        <p><b>Product ID:</b> {order.productId}</p>
        <p><b>Quantity:</b> {order.quantity}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Total Price:</b> {order.price}</p>

        <button onClick={onClose} style={closeBtnStyle}>
          Close
        </button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  width: "400px",
  borderRadius: "8px"
};

const closeBtnStyle = {
  marginTop: "15px",
  padding: "8px",
  width: "100%",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

export default OrderModal;
