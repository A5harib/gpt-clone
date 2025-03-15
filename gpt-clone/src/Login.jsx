import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">ChatGPT</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome back
        </h2>

        <input
          type="email"
          placeholder="Email address*"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4">
          Continue
        </button>

        <p className="text-gray-600 text-sm text-center mb-4">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>

        <div className="border-t border-gray-300 my-4"></div>

        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-semibold mb-3 hover:bg-gray-200 transition">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-semibold mb-3 hover:bg-gray-200 transition">
          <img
            src="/microsoft-icon.svg"
            alt="Microsoft"
            className="w-5 h-5 mr-2"
          />
          Continue with Microsoft Account
        </button>

        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-semibold mb-3 hover:bg-gray-200 transition">
          <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5 mr-2" />
          Continue with Apple
        </button>

        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          <img src="/phone-icon.svg" alt="Phone" className="w-5 h-5 mr-2" />
          Continue with phone
        </button>
      </div>
    </div>
  );
};

export default Login;
