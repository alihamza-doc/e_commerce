import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://ecom-backend-bedb.onrender.com/api/orders",
        {
          shippingAddress: {
            name: form.name,
            address: form.address,
            phone: form.phone,
          },
          paymentMethod: form.paymentMethod || "cod",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setCart([]); // Clear local cart
      navigate("/order-confirmation", { state: res.data.order });
    } catch (err) {
      console.error(err);
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-5 mb-5">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="row">
          {/* Shipping and Payment Form */}
          <div className="col-md-6">
            <h4>Shipping Info</h4>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  name="paymentMethod"
                  className="form-select"
                  value={form.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="stripe" disabled>Stripe (coming soon)</option>
                  <option value="paypal" disabled>PayPal (coming soon)</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-md-6">
            <h4>Order Summary</h4>
            <ul className="list-group mb-3">
              {cart.map((item) =>
                item.product ? (
                  <li
                    key={item.product._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>${item.product.price * item.quantity}</span>
                  </li>
                ) : null
              )}
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${total}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
