import express from "express";
import {
  createBill,
  getUserBills,
  getAllBills,
} from "../controllers/billController.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/create", auth, createBill);
router.get("/my-bills", auth, getUserBills);
router.get("/all", adminAuth, getAllBills);

export default router;
