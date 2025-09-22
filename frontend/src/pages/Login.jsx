import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ecom-backend-bedb.onrender.com/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mt-5">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="col-md-6 col-sm-12 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Login</button>
        <Link to={"/register"}
          className="p-3"
         >Don't have an account? Sign Up</Link>
        
          
        
      </form>
     
    </div>
  );
}
