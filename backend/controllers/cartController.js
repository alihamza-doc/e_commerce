import Cart from "../models/Cart.js";

// Get current user's cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  
if (!cart) return res.json({ items: [] });

res.json({ items: cart.items });
};

// Add or update product in cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.equals(productId));
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json({ items: cart.items });
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((item) => !item.product.equals(productId));
  await cart.save();

   // repopulate after saving
  await cart.populate("items.product");
  res.json({ message: "Item removed", cart });
};
