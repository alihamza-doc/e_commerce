import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`https://ecom-backend-bedb.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container mt-5 pt-5">
      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <div className="border rounded shadow-sm p-3 bg-white">
            <img
              src={product.image || "https://via.placeholder.com/400x400"}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>

          <h4 className="text-success fw-bold mb-4">
            PRICE : {product.price?.toLocaleString()}
          </h4>

          <button
            className="btn btn-primary btn-lg px-4 rounded-pill shadow"
            onClick={() => {
              if (!user) {
                alert("Please login first");
                return;
              }
              addToCart(product);
            }}
          >
            🛒 Add to Cart
          </button>

          {/* Extra Info Section */}
          <div className="mt-5">
            <h5 className="fw-semibold mb-3">Product Information</h5>
            <ul className="list-group list-group-flush shadow-sm rounded">
              <li className="list-group-item">
                <strong>Category:</strong> {product.category || "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Stock:</strong>{" "}
                {product.stock > 0 ? (
                  <span className="text-success">In Stock</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </li>
              <li className="list-group-item">
                <strong>SKU:</strong> {product._id}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
