import React from "react";

export default function TransactionItem({ transaction, onDelete }) {

    const dateFormatter = new Intl.DateTimeFormat("en-IN", { year: "numeric", month: "short", day: "numeric" });

    const currencyFormatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

    return (
        <li
            className={`flex justify-between items-center border rounded p-3 bg-white shadow ${transaction.type === "income" ? "text-green-700" : "text-red-700"
                }`}
        >
            <div>
                <p className="font-semibold">
                    {transaction.type === "income" ? "+" : "-"}
                    {currencyFormatter.format(transaction.amount)} - {transaction.category}
                </p>
                {transaction.note && <p className="text-sm text-gray-600">{transaction.note}</p>}
                <p className="text-xs text-gray-400">{dateFormatter.format(new Date(transaction.date))}</p>
            </div>

            <button
                onClick={() => onDelete(transaction._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
            >
                Delete
            </button>
        </li>
    );
}
