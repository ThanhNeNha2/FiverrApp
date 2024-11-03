import express from "express";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controller/review.controller";
import { verifyToken } from "../middleware/jwt";
const router = express.Router();
router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", deleteReview);

export default router;
