import express from "express";

import { verifyToken } from "../middleware/jwt";
import { getOrders, intent, confirm } from "../controller/order.controller";
const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

router.post("/create-payment-intent/:id", verifyToken, intent);

router.put("/", verifyToken, confirm);

export default router;
