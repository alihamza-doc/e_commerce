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
        .get("https://ecom-backend-bedb.onrender.com/api/orders/admin", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setOrders(res.data))
        .catch(() => setError("Failed to fetch orders"));
    }
  }, [user]);

  // Status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://ecom-backend-bedb.onrender.com/api/orders/${orderId}/status`,
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
    return <h3 className="text-center mt-5 text-danger">🚫 Access Denied</h3>;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "Processing":
        return "bg-primary";
      case "Shipped":
        return "bg-info text-dark";
      case "Delivered":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">📦 All Orders</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="fw-semibold">{order._id.slice(0, 8)}...</td>
                <td>{order.user?.name || <em>Unknown</em>}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.shippingAddress?.name}<br />
                  {order.shippingAddress?.address}
                </td>
                <td>{order.paymentMethod}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <span className={`badge ${getStatusBadge(order.status)} px-3 py-2`}>
                    {order.status}
                  </span>
                </td>
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
    </div>
  );
}
