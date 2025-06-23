import axios from "axios";

const API = axios.create({
    baseURL: "https://personal-finance-tracker-1suy.onrender.com/api/v1",
    withCredentials: true,
});

export const fetchTransactions = () => API.get("/transactions");
export const createTransaction = (data) => API.post("/transactions", data);
export const removeTransaction = (id) => API.delete(`/transactions/${id}`);
