import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const {user} = useAuth();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image || "https://via.placeholder.com/400x400"}
            alt={product.name}
            className="img-fluid w-75"
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4 className="text-success">${product.price}</h4>
          <button
            className="btn btn-dark mt-3"
            onClick={() => {
              if(!user){
                alert("please login first")
                return
              }
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
