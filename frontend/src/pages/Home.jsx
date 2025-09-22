import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // 🔹 Search icon
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false); // 🔹 toggle search for mobile
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://ecom-backend-bedb.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid mt-5 pt-5 bg-light p-2 p-lg-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pt-4">
        <h2 className="text-dark-blue">CHOOSE YOUR PRODUCT</h2>

        {/* 🔹 Desktop Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50 border-primary d-none d-md-block"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔹 Mobile Search Icon */}
        <button
          className="btn btn-outline-primary d-md-none"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FaSearch />
        </button>
      </div>

      {/* 🔹 Mobile Search Bar (toggle with animation) */}
      {showSearch && (
        <div className="mb-3 d-md-none">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control border-primary animate__animated animate__fadeInDown"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      )}

      <div className="g-4 row">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-primary me-3 flex-shrink-0"
              role="status"
              style={{ width: "2rem", height: "2rem" }}>
            </div>
            <span className="text-primary fw-bold d-inline-block" style={{ lineHeight: "1" }}>
              LOADING PRODUCTS... PLEASE WAIT!
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center p-5 text-danger fw-bold">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div className="col-md-3 col-sm-6 mb-4" key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm border-primary hover-shadow">
                  <div
                    style={{
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      overflow: "hidden", // hide zoom overflow
                    }}
                  >
                    <img
                      className="card-img-hover"
                      src={
                        product.image || "https://via.placeholder.com/300x250"
                      }
                      alt={product.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        transition: "transform 0.4s ease", // smooth zoom
                      }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title border-bottom border-primary pb-3">
                      {product.name}
                    </h5>
                    <p className="card-text">
                      {product.description?.slice(0, 100)}...
                    </p>
                    <h6 className="card-subtitle mb-3 text-muted">
                      Price: <span className="fw-bold">{product.price}</span>
                    </h6>

                    <button
                      className="CartButton"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!user) {
                          alert("Please login first");
                          return;
                        }
                        addToCart(product);
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>


    </div>
  );
}
