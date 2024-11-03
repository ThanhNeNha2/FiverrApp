import express from "express";

import { verifyToken } from "../middleware/jwt";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controller/gig.controller";
const router = express.Router();
router.get("/", getGigs);
router.get("/single/:id", getGig);
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);

export default router;
