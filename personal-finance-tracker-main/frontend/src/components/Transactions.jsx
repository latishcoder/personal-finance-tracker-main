import React, { useEffect, useState, useMemo } from "react";
import {
  fetchTransactions,
  createTransaction,
  removeTransaction,
} from "../services/transactionService";
import toast from "react-hot-toast";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyBarChart from "./MonthlyBarChart";
import StatsCard from "./StatsCard";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("add");

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetchTransactions();
      setTransactions(res.data.data);
    } catch {
      toast.error("Failed to load transactions");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleAddTransaction = async (transactionData) => {
    try {
      await createTransaction(transactionData);
      toast.success("Transaction added");
      loadTransactions();
      setView("list");
    } catch {
      toast.error("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await removeTransaction(id);
      toast.success("Transaction deleted");
      loadTransactions();
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0,
      expense = 0;
    for (const tx of transactions) {
      if (tx.type === "income") income += Number(tx.amount);
      else if (tx.type === "expense") expense += Number(tx.amount);
    }
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* View Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => setView("add")}
          className={`px-4 py-2 rounded font-medium ${view === "add"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
        >
          Add Transaction
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded font-medium ${view === "list"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
        >
          Your Transactions
        </button>
      </div>

      {/* Form View */}
      {view === "add" && <TransactionForm onSubmit={handleAddTransaction} />}

      {/* List View */}
      {view === "list" && (
        <>
          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="Total Income"
              value={formatCurrency(totalIncome)}
              className="bg-green-100 text-green-800"
            />
            <StatsCard
              title="Total Expense"
              value={formatCurrency(totalExpense)}
              className="bg-red-100 text-red-800"
            />
            <StatsCard
              title="Balance"
              value={formatCurrency(balance)}
              className={`${balance >= 0
                ? "bg-blue-100 text-blue-800"
                : "bg-red-200 text-red-900"
                }`}
            />
          </div>

          {/* Scrollable Transaction List */}
          <div className="max-h-96 overflow-y-auto border rounded-md p-2 mb-8">
            <TransactionList
              transactions={transactions}
              loading={loading}
              onDelete={handleDeleteTransaction}
            />
          </div>

          {/* Charts */}
          <div className="my-8 flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            <div className="bg-white p-4 rounded shadow w-full lg:w-1/2">
              <h2 className="text-lg font-semibold mb-4 text-green-700">
                Expenses by Category
              </h2>
              <CategoryPieChart transactions={transactions} />
            </div>

            <div className="bg-white p-4 rounded shadow w-full lg:w-1/2">
              <h2 className="text-lg font-semibold mb-4 text-blue-700">
                Monthly Income & Expense Trends
              </h2>
              <MonthlyBarChart transactions={transactions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
