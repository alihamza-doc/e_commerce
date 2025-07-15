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
        const res = await axios.get("https://ecom-backend-bedb.onrender.com/api/cart", {
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
        "https://ecom-backend-bedb.onrender.com/api/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

    
      // ✅ Refetch updated cart
      const res = await axios.get("https://ecom-backend-bedb.onrender.com/api/cart", {
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
      const res = await axios.delete(`https://ecom-backend-bedb.onrender.com/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };
  
  const increaseQuantity = async (productId) => {
  const item = cart.find((item) => item.product._id === productId);
  if (!item) return;

  const newQuantity = item.quantity + 1;

  try {
    await axios.patch(
      `https://ecom-backend-bedb.onrender.com/api/cart/${productId}`,
      { quantity: newQuantity }, // ✅ Send quantity in body
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    // ✅ Refresh cart
    const res = await axios.get("https://ecom-backend-bedb.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setCart(res.data.items);
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};

const decreaseQuantity = async (productId) => {
  const item = cart.find((item) => item.product._id === productId);
  if (!item || item.quantity <= 1) return;

  const newQuantity = item.quantity - 1;

  try {
    await axios.patch(
      `https://ecom-backend-bedb.onrender.com/api/cart/${productId}`,
      { quantity: newQuantity }, // ✅ Send quantity in body
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    // ✅ Refresh cart
    const res = await axios.get("https://ecom-backend-bedb.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setCart(res.data.items);
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};





const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , cartCount, setCart, decreaseQuantity,increaseQuantity}}>
      {children}
    </CartContext.Provider>
  );
 

};
