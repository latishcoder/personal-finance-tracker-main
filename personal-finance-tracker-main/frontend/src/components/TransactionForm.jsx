import React, { useState } from "react";

export default function TransactionForm({ onSubmit }) {
    const [form, setForm] = useState({
        amount: "",
        type: "income",
        category: "",
        note: "",
        date: new Date().toISOString().slice(0, 10),
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.amount || !form.type || !form.category) {
            alert("Please fill required fields");
            return;
        }
        setLoading(true);
        await onSubmit(form);
        setLoading(false);
        setForm({
            amount: "",
            type: "income",
            category: "",
            note: "",
            date: new Date().toISOString().slice(0, 10),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded bg-white shadow">
            <div className="flex gap-4">
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    className="flex-1 border px-3 py-2 rounded"
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />

            <input
                type="text"
                name="note"
                placeholder="Note (optional)"
                value={form.note}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />

            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Saving..." : "Add Transaction"}
            </button>
        </form>
    );
}
