import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#AA00FF", "#FF00AA", "#00FFAA", "#AAFF00",
];

export default function CategoryPieChart({ transactions }) {
    // Filter only expenses and group by category with sum
    const expenseTxns = transactions.filter(tx => tx.type === "expense");

    const categoryMap = expenseTxns.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
        return acc;
    }, {});

    const data = Object.entries(categoryMap).map(([category, amount]) => ({
        name: category,
        value: amount,
    }));

    if (data.length === 0) return <p className="text-center text-gray-600">No expense data to show</p>;

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) =>
                        new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                        }).format(value)
                    }
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
