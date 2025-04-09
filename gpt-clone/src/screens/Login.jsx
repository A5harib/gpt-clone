import React, { useState } from "react";
import { login } from "../services/auth"; // Import login instead of createUser
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const user = await login(email, password);
      await login(email, password);
      if (!user) throw new Error("Authentication failed"); // Extra safeguard

      navigate("/chat");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

        <h1 className="text-2xl font-semibold text-gray-900 mb-6">MrAI</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome back
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            name="email"
            placeholder="Email address*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold transition mb-4 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mb-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <div className="border-t border-gray-300 my-4"></div>
        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-semibold mb-3 hover:bg-gray-200 transition">
          <img
            src="src/assets/google-icon.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
