import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-2 bg-green-600 text-white">
      <div
        className="text-lg font-bold flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src="https://marketplace.canva.com/EAGQZhT83lg/1/0/1600w/canva-dark-green-modern-illustrative-finance-service-logo-GTKa2Yxea4Y.jpg"
          alt="Finance Logo"
          className="w-14 h-14 rounded-full"
        />
        <span className="text-2xl">
          Personal <span className="text-[#023126]">Finance</span> Tracker
        </span>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name?.charAt(0))}&background=0D8ABC&color=fff`} alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:scale-105 transition-transform"
            onClick={() => navigate("/profile")}
          />

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
