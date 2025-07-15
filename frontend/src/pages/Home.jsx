import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 Search state
  const { addToCart } = useCart();
  const { user } = useAuth();


  useEffect(() => {
    axios
      .get("https://ecom-backend-bedb.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔍 Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5 pt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50 border-dark"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image || "https://via.placeholder.com/300x250"}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description?.slice(0, 100)}...
                  </p>
                  <h6 className="card-subtitle mb-2 text-muted">
                    ${product.price}
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
                      onClick={() => {
                        if (!user) {
                          alert("Please login first");
                          return;
                        }
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
