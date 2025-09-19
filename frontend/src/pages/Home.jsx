import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true); // 🔹 Loading state
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true); // start loading
    axios
      .get("https://ecom-backend-bedb.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // stop loading
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid mt-5 pt-5 bg-light p-2 p-lg-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pt-4">
        <h2 className="text-dark-blue">CHOOSE YOUR PRODUCT</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50 w-md-50 border-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container-fluid row">
        {loading ? (
          // 🔹 Show spinner or loading text
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-primary me-3" role="status" />
            <span className="text-primary fw-bold">
              LOADING PRODUCTS... PLEASE WAIT!
            </span>
            
          </div>
          
        ) : filteredProducts.length === 0 ? (
          // 🔹 No products found
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
                <div className="card h-100 shadow-sm border-primary">
                  <div
                    style={{
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      src={product.image || "https://via.placeholder.com/300x250"}
                      alt={product.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
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
