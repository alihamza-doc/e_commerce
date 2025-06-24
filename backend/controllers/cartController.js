import Cart from "../models/Cart.js";

// Get cart for logged-in user
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { user: req.user._id, items: [] });
};

// Add or update item in cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.json(cart);
};

// Update quantity
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(item => item.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not in cart" });

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
};

// Remove item
export const removeCartItem = async (req, res) => {
  const productId = req.params.productId;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();

  res.json(cart);
};
