import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
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

    const imageUrl = res.data.imageUrl;
    setForm(prev => ({ ...prev, image: imageUrl })); // ✅ Correct state update
    console.log("Image uploaded:", imageUrl);

  } catch (err) {
    console.error(err);
    setError("Image upload failed");
  } finally {
    setUploading(false);
  }
};


  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post("https://ecom-backend-bedb.onrender.com/api/products", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      navigate("/"); // redirect to home
    } catch (err) {
      console.error(err);
      setError("Failed to create product");
    }
  };

  if (user?.role !== "admin") {
    return <h3 className="text-center mt-5">Access Denied</h3>;
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center pb-2">Add New Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" name="stock" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
          {uploading && <div className="form-text text-info">Uploading image...</div>}
          {form.image && (
            <img src={form.image} alt="preview" className="mt-3" style={{ maxHeight: "200px" }} />
          )}

        </div>

        <button type="submit" className="btn btn-success w-100" disabled={uploading}>
          Add Product
        </button>
      </form>
    </div>
  );
}
