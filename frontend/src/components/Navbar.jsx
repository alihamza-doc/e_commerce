import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const role = user?.role || "guest";
  const navbarRef = useRef(null);

  const closeNavbar = () => {
    if (navbarRef.current && window.innerWidth < 992) {
      const bsCollapse = new bootstrap.Collapse(navbarRef.current, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll("#mainNavbar .nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", closeNavbar);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeNavbar);
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-dark-blue shadow fixed-top "
     >
      <div className="container-fluid ">
        <Link className="" to="/" onClick={closeNavbar}>
         <img src="https://res.cloudinary.com/doabbpdy1/image/upload/v1758111585/logo_ytvefe.png" alt="" className=" rounded background " width={140} height={80} />
        </Link>

        <button
          className="navbar-toggler position-relative"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>

          {/* Show badge if cart has items */}
          {cartCount > 0 && (
            <span  
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.7rem" }}
            >
              {cartCount}
            </span>
          )}
        </button>

        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
          ref={navbarRef}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={closeNavbar}>
                About
              </NavLink>
            </li>

            <li className="nav-item">
              {user && (
                <Link
                  to="/cart"
                  className="nav-link d-inline-flex align-items-center position-relative"
                  onClick={closeNavbar}
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

            {/* Show "My Orders" to all logged-in users */}
            {user && (
              <li className="nav-item">
                <Link
                  to="/my-orders"
                  className="nav-link"
                  onClick={closeNavbar}
                >
                  My Orders
                </Link>
              </li>
            )}

            {/* Admin-only links */}
            {role === "admin" && (
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className="nav-link"
                  onClick={closeNavbar}
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={closeNavbar}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    onClick={closeNavbar}
                  >
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
                    onClick={() => {
                      closeNavbar();
                      logout();
                    }}
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
