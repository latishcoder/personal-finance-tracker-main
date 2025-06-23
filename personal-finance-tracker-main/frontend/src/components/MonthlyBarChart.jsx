import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ transactions }) {
    // Group transactions by month and type
    const monthlyData = {};

    transactions.forEach(tx => {
        const date = new Date(tx.date);
        const monthKey = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
        });

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0 };
        }

        monthlyData[monthKey][tx.type] += Number(tx.amount);
    });

    // Convert to array and sort by date
    const data = Object.values(monthlyData).sort((a, b) => {
        const [aMonth, aYear] = a.month.split(" ");
        const [bMonth, bYear] = b.month.split(" ");
        return new Date(`${aMonth} 1, ${aYear}`) - new Date(`${bMonth} 1, ${bYear}`);
    });

    if (data.length === 0) return <p className="text-center text-gray-600">No data to show monthly trends</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                    formatter={(value) =>
                        new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                        }).format(value)
                    }
                />
                <Legend />
                <Bar dataKey="income" stackId="a" fill="#82ca9d" />
                <Bar dataKey="expense" stackId="a" fill="#ff7f7f" />
            </BarChart>
        </ResponsiveContainer>
    );
}
