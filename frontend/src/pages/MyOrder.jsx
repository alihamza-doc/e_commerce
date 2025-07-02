import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">🧾 My Orders</h2>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && orders.length === 0 && (
        <div className="alert alert-info">No orders found.</div>
      )}

      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 col-lg-4 mb-4" key={order._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title py-3 my-2">Order ID: <span className="text-muted py-3">{order._id}</span></h5>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <strong>Total:</strong> ${order.totalPrice}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${order.isDelivered ? "bg-success" : "bg-warning text-dark"}`}>
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
