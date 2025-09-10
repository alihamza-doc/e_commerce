import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaUserShield, FaUsers, FaEnvelope, FaClipboardList } from "react-icons/fa";

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      axios
        .get("https://ecom-backend-bedb.onrender.com/api/users/admin", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setUsers(res.data))
        .catch(() => setError("Failed to fetch users"));
    }
  }, [user]);

  const getRoleBadge = (role) => {
    return role === "admin"
      ? "badge bg-success"
      : "badge bg-secondary";
  };

  if (!user || user.role !== "admin") {
    return <h3 className="text-center text-danger mt-5">🚫 Access Denied</h3>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4"><FaUsers className="me-2" />All Registered Users</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th><FaUserShield className="me-1" /> Name</th>
              <th><FaEnvelope className="me-1" /> Email</th>
              <th>Role</th>
              <th><FaClipboardList className="me-1" /> Orders</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="fw-semibold">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={getRoleBadge(u.role)}>{u.role}</span>
                </td>
                <td>{u.orderCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
