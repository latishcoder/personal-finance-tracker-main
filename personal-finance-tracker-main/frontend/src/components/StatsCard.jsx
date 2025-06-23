import React from "react";

export default function StatsCard({ title, value, className }) {
  return (
    <div
      className={`p-4 rounded shadow flex flex-col items-center justify-center ${className}`}
    >
      <h3 className="text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
