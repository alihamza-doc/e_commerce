import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {adminOnly} from "../middleware/authMiddleware.js"
import { placeOrder } from "../controllers/orderController.js";
import { getAllOrders } from "../controllers/orderController.js";
import { updateOrderStatus } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", protect, placeOrder);

// routes/orderRoutes.js
router.get("/admin", protect, adminOnly, getAllOrders);


// Update order status (admin only)
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
