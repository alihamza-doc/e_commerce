import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
    <>
    <h3 className="text-center mt-5 text-danger">Access Denied.</h3>
    <h4 className="text-center my-3 text-danger"> Please login as Admin</h4>
    </>
    )
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">edit, delete products</p>
              <Link to="/admin/manageproducts" className="btn btn-outline-primary">Go</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Manage Orders</h5>
              <p className="card-text">View and process customer orders</p>
              <Link to="/admin/orders" className="btn btn-outline-success">Go</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">Manage user accounts</p>
              <Link to="/admin/users" className="btn btn-outline-dark">Go</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Add Products</h5>
              <p className="card-text">Add product</p>
              <Link to="/add-product" className="btn btn-outline-dark">Go</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
