"use client";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/admin/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status === "success") {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUsername", res.data.username);
        alert("Login successful");
        navigate("/"); // redirect to admin panel
      }
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.response?.data?.status || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="mb-2 p-2 rounded w-64 text-black"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 p-2 rounded w-64 text-black"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 p-2 rounded w-64 hover:bg-blue-700">
        Login
      </button>
    </div>
  );
}
