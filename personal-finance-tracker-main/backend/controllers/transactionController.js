import asyncHandler from "express-async-handler";
import createError from "http-errors";
import Transaction from "../models/Transaction.js";
import ApiResponse from "../utils/ApiResponse.js";

const addTransaction = asyncHandler(async (req, res, next) => {
    const { amount, type, category, note, date } = req.body;

    if (!amount || !type || !category) {
        return next(createError(400, "Please provide amount, type, and category"));
    }

    const transaction = await Transaction.create({
        user: req.user._id,
        amount,
        type,
        category,
        note,
        date,
    });

    res
        .status(201)
        .json(new ApiResponse(transaction, "Transaction added successfully"));
});

const getTransactions = asyncHandler(async (req, res, next) => {

    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });

    res
        .status(200)
        .json(new ApiResponse(transactions, "Fetched transactions successfully"));
});

const deleteTransaction = asyncHandler(async (req, res, next) => {
    
    const transaction = await Transaction.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!transaction) {
        return next(createError(404, "Transaction not found"));
    }

    res.status(200).json(new ApiResponse(null, "Transaction deleted successfully"));
});

export { addTransaction, getTransactions, deleteTransaction };
