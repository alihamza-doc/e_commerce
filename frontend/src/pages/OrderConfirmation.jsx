// pages/OrderConfirmation.jsx
import { useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state;

  return (
    <div className="container mt-4">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.status}</p>
      <p>Total Paid: ${order.totalPrice}</p>
    </div>
  );
}
