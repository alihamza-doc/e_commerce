import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ecom-backend-bedb.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://ecom-backend-bedb.onrender.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100 shadow-sm">
              <div
                  style={{
                    height: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white"
                  }}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/300x250"}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>


              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description?.slice(0, 100)}...
                </p>
                <h6 className="card-subtitle mb-2 text-muted">
                 PRICE :  {product.price}
                </h6>

                <div className="mt-auto d-flex gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-outline-primary w-50"
                  >
                    Details
                  </Link>
                  <button
                    className="btn btn-success w-50"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Admin Buttons */}
                {user?.role === "admin" && (
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-warning w-50"
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
