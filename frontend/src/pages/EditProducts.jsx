import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://ecom-backend-bedb.onrender.com/api/products/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("https://ecom-backend-bedb.onrender.com/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setForm((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ecom-backend-bedb.onrender.com/api/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Product updated successfully");
      navigate("/admin/manageproducts");
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };

  if (user?.role !== "admin") {
    return <h3 className="text-center mt-5">Access Denied</h3>;
  }

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center">Edit Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
          {uploading && <div className="form-text text-info">Uploading image...</div>}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mt-3"
              style={{ maxHeight: "200px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={uploading}>
          Update Product
        </button>
      </form>
    </div>
  );
}
