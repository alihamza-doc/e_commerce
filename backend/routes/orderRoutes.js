import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  markAsDelivered,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", placeOrder);
router.get("/my", getMyOrders);
router.get("/:id", getOrderById);

// Admin-only
router.get("/", isAdmin, getAllOrders);
router.put("/:id/deliver", isAdmin, markAsDelivered);

export default router;
