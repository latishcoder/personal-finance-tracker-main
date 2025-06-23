import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, loading, onDelete }) {
    const [filter, setFilter] = useState({
        startDate: "",
        endDate: "",
        category: "",
        type: "all", // all, income, expense
    });

    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        let filtered = [...transactions];

        if (filter.type !== "all") {
            filtered = filtered.filter((tx) => tx.type === filter.type);
        }

        if (filter.category.trim() !== "") {
            filtered = filtered.filter((tx) =>
                tx.category.toLowerCase().includes(filter.category.toLowerCase())
            );
        }

        if (filter.startDate) {
            filtered = filtered.filter((tx) => new Date(tx.date) >= new Date(filter.startDate));
        }
        if (filter.endDate) {
            filtered = filtered.filter((tx) => new Date(tx.date) <= new Date(filter.endDate));
        }

        setFilteredTransactions(filtered);
    }, [filter, transactions]);

    const handleFilterChange = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const incomeTransactions = filteredTransactions.filter((tx) => tx.type === "income");
    const expenseTransactions = filteredTransactions.filter((tx) => tx.type === "expense");

    return (
        <>
            {/* Filters */}
            <div className="mb-6 p-4 bg-gray-100 rounded shadow flex flex-wrap gap-4 justify-center">
                <select
                    name="type"
                    value={filter.type}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <input
                    type="text"
                    name="category"
                    placeholder="Filter by Category"
                    value={filter.category}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                />

                <input
                    type="date"
                    name="startDate"
                    value={filter.startDate}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                    max={filter.endDate || undefined}
                />

                <input
                    type="date"
                    name="endDate"
                    value={filter.endDate}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                    min={filter.startDate || undefined}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Income Section */}
                <section className="flex-1 bg-green-50 p-4 rounded shadow max-h-[60vh] overflow-auto">
                    <h3 className="text-xl font-semibold mb-4 text-green-700">Income</h3>
                    {loading && <p>Loading transactions...</p>}
                    {!loading && incomeTransactions.length === 0 && <p>No income transactions found.</p>}
                    <ul className="space-y-3">
                        {incomeTransactions.map((tx) => (
                            <TransactionItem key={tx._id} transaction={tx} onDelete={onDelete} />
                        ))}
                    </ul>
                </section>

                {/* Expense Section */}
                <section className="flex-1 bg-red-50 p-4 rounded shadow max-h-[60vh] overflow-auto">
                    <h3 className="text-xl font-semibold mb-4 text-red-700">Expenses</h3>
                    {loading && <p>Loading transactions...</p>}
                    {!loading && expenseTransactions.length === 0 && <p>No expense transactions found.</p>}
                    <ul className="space-y-3">
                        {expenseTransactions.map((tx) => (
                            <TransactionItem key={tx._id} transaction={tx} onDelete={onDelete} />
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
}
