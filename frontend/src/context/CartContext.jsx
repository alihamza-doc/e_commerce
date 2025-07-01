import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // ✅ Load cart when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCart(res.data.items);
        console.log("Cart loaded:", res.data.items);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };

    fetchCart();
  }, [user]);

  // ✅ Add product to cart and refresh from backend
  const addToCart = async (product) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

    
      // ✅ Refetch updated cart
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart(res.data.items);
      console.log("Cart after add:", res.data.items);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  // ✅ Remove product from cart and refresh
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , cartCount, setCart}}>
      {children}
    </CartContext.Provider>
  );
};
