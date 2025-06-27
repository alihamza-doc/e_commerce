import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      axios
        .get("http://localhost:5000/api/users/admin", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setUsers(res.data))
        .catch(() => setError("Failed to fetch users"));
    }
  }, [user]);

  return (
    <div className="container mt-4 mb-5">
      <h2>All Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.orderCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
