import express from "express";

import { verifyToken } from "../middleware/jwt";
import { createMessage, getMessage } from "../controller/message.controller";

const router = express.Router();
router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessage);

export default router;
