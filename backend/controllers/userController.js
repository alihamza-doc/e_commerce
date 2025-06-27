import User from "../models/User.js";
import Order from "../models/Order.js";

export const getAllUsersWithOrders = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id });
        return {
          ...user.toObject(),
          orderCount: orders.length,
        };
      })
    );

    res.json(usersWithOrders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
