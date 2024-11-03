import express from "express";
import { getUser, deleteUser } from "../controller/user.controller";
import { verifyToken } from "../middleware/jwt";
const router = express.Router();

router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
