import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getTransactions) 
  .post(protect, createTransaction); 

router
  .route("/:id")
  .patch(protect, updateTransaction) 
  .delete(protect, deleteTransaction); 

export default router;
