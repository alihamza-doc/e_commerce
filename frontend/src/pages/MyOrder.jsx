import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const [productsInfo, setProductsInfo] = useState({}); // Stores product details

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) {
        setError("Please login to view your orders");
        setLoading(false);
        return;
      }

      try {
        setError("");
        setLoading(true);

        // 1. Fetch orders
        const ordersRes = await axios.get(
          "https://ecom-backend-bedb.onrender.com/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${user.token}` },
            params: { page: currentPage, limit: ordersPerPage }
          }
        );

        const fetchedOrders = ordersRes.data;
        setOrders(fetchedOrders);

        // 2. Fetch product details
        const productIds = fetchedOrders.flatMap(order =>
          order.items.map(item => item.product)
        );

        if (productIds.length > 0) {
          const productsRes = await axios.post(
            "https://ecom-backend-bedb.onrender.com/api/products/batch",
            { ids: productIds },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );

          const productsMap = {};
          productsRes.data.forEach(product => {
            productsMap[product._id] = product;
          });
          setProductsInfo(productsMap);
        }

      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load orders. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, currentPage, ordersPerPage]);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-success";
      case "shipped": return "bg-primary";
      case "processing": return "bg-info text-dark";
      case "cancelled": return "bg-danger";
      default: return "bg-warning text-dark";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🧾 My Orders</h2>
        {orders.length > 0 && (
          <small className="text-muted">
            Showing {(currentPage - 1) * ordersPerPage + 1}-
            {Math.min(currentPage * ordersPerPage, orders.length)} of {orders.length} orders
          </small>
        )}
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your orders...</p>
        </div>
      )}

      {/* {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )} */}

      {!loading && orders.length === 0 && !error && (
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          You haven't placed any orders yet.
          <Link to="/" className="alert-link ms-1">Start shopping</Link>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {orders.map((order) => (
          <div className="col" key={order._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order #{order._id.substring(0, 8)}</h5>
                  <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text"><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                <p className="card-text"><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
                <p className="card-text"><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>

                <div className="mt-3">
                  <h6>Products:</h6>
                  <ul className="list-unstyled">
                    {order.items.slice(0, 3).map((item) => {
                      const product = productsInfo[item.product];
                      return (
                        <li key={item._id} className="d-flex align-items-center mb-2">
                          {product?.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="rounded me-2"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="rounded me-2 bg-light" style={{ width: '40px', height: '40px' }}></div>
                          )}
                          <div>
                            <div className="text-truncate" style={{ maxWidth: '150px' }}>
                              {product?.name || "Product not found"}
                            </div>
                            <small className="text-muted">
                              Qty: {item.quantity} × ${product?.price ? product.price.toFixed(2) : 'N/A'}
                            </small>
                          </div>
                        </li>
                      );
                    })}
                    {order.items.length > 3 && (
                      <li className="text-muted">+{order.items.length - 3} more items...</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <Link
                  to={`/order/${order._id}`}
                  className="btn btn-outline-primary btn-sm w-100"
                >
                  View Order Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {orders.length > 0 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
            </li>
            {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(num => (
              <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage * ordersPerPage >= orders.length ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MyOrders;
