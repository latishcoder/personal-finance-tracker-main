import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";

const Auth = () => {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        <p className="text-center text-gray-600">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-600 hover:underline font-semibold focus:outline-none"
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
