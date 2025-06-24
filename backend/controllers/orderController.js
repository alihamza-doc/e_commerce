import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create new order
export const placeOrder = async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
  });

  res.status(201).json(order);
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product");
  res.json(orders);
};

// Get one order by ID
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email").populate("items.product");

  if (!order) return res.status(404).json({ message: "Order not found" });

  if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(order);
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email").populate("items.product");
  res.json(orders);
};

// Admin: Mark as delivered
export const markAsDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.isDelivered = true;
  order.deliveredAt = new Date();
  await order.save();

  res.json({ message: "Order marked as delivered" });
};
