import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      axios
        .get("http://localhost:5000/api/orders/admin", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => setError("Failed to fetch orders"));
    }
  }, [user]);

  //order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  if (!user || user.role !== "admin") {
    return <h3 className="text-center mt-5">Access Denied</h3>;
  }

  return (
    <div className="container mt-4 mb-5">
      <h2>All Orders</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(0, 8)}...</td>
              <td>{order.user?.name || "Unknown"}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.shippingAddress?.name}, {order.shippingAddress?.address}
              </td>
              <td>{order.paymentMethod}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
