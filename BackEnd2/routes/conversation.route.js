import express from "express";
import { verifyToken } from "../middleware/jwt";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controller/conversation.controller";

const router = express.Router();

router.post("/", verifyToken, createConversation);
router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
