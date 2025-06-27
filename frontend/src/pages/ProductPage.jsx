import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setError("Product not found");
      });
  }, [id]);

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  if (!product) {
    return <div className="container mt-4">Loading product...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{product.name}</h1>
      <img className="rounded"  src={product.image} alt={product.name} style={{ height: "200px" }} />
      <p className="py-3"><strong>Description:  </strong>{product.description}</p>
      <h5>Price: ${product.price}</h5>
      <p>Stock: {product.stock}</p>
    </div>
  );
}
