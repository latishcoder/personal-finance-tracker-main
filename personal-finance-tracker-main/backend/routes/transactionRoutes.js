import express from "express";
import { auth } from "../middleware/auth.js";
import {
    addTransaction,
    getTransactions,
    deleteTransaction,
} from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.route("/").post(auth, addTransaction);
transactionRouter.route("/").get(auth, getTransactions);
transactionRouter.route("/:id").delete(auth, deleteTransaction);

export { transactionRouter };
