import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirm) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/users/register", {
        email,
        password,
      });

      console.log("Signup Response:", res.data);

      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Sign up failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 glass-card ring-1 ring-gray-800 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="text-sm text-gray-400 mt-1">
            Register to access the dashboard
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
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Confirm password</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
