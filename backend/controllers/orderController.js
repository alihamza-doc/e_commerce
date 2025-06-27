import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress , paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const simplifiedItems = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity
    }));
    const order = new Order({
      user: req.user._id,
      items: simplifiedItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });
    console.log("Incoming order from:", req.user);
    console.log("Shipping:", shippingAddress);
    console.log("Cart items:", cart.items);
    console.log("Total:", totalPrice);

    await order.save();

    // Optional: clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// controller/orderController.js
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};

