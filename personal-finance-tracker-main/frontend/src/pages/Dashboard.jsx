import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import Transactions from "../components/Transactions";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <>
            <div className="p-8 min-h-[90vh] bg-gray-700">
                {/* <h1 className="text-2xl font-bold mb-4">Welcome to, {user?.name}</h1> */}
                {/* Add more dashboard content here */}
                <Transactions />
            </div>
        </>
    );
}
