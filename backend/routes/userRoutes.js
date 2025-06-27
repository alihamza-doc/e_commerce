import { getAllUsersWithOrders } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router()
router.get("/admin", protect, adminOnly, getAllUsersWithOrders);


export default router;