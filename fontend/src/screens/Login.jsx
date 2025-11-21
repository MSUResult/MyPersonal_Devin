import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/users/login", { email, password });

      console.log("Login Response:", res.data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user)

      navigate("/"); // redirect home
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 glass-card ring-1 ring-gray-800 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to continue to your account
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Password</span>
              <Link
                to="/forgot-password"
                className="text-xs text-indigo-400 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:underline font-medium"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
