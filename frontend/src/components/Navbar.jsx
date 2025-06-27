import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const role = user?.role || "guest";
  const { cartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🛍 E-Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              {user && (
                <Link
                  to="/cart"
                  className="nav-link d-inline-flex align-items-center position-relative"
                >
                  🛒 Cart
                  {cartCount > 0 && (
                    <span
                      className="badge bg-danger ms-1"
                      style={{
                        fontSize: "0.7rem",
                        padding: "4px 6px",
                        marginTop: "-2px",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </li>

            {role === "admin" && (
              <>
                
                <li className="nav-item">
                  <NavLink to="/add-product" className="nav-link text-white">
                    Add Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link">
                    Admin Panel
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled">👋 {user.name}</span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-outline-light btn-sm ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
