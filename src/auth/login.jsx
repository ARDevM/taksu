import { useState } from "react";
import api from "../api/axios";
import { saveAuth } from "../store/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      saveAuth({ token: res.data.token, user: res.data.user });

      const role = res.data.role;
      if (role === "super_admin") window.location.href = "/super";
      else if (role === "admin") window.location.href = "/admin";
      else window.location.href = "/customer";
    } catch {
      setError("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <form onSubmit={submit} className="bg-neutral-800 p-8 rounded-xl w-96">
        <h1 className="text-xl font-bold text-white mb-4">Login</h1>

        {error && <p className="text-red-400">{error}</p>}

        <input
          className="w-full p-2 mb-3 rounded bg-neutral-700 text-white"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-neutral-700 text-white"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded text-white">
          Login
        </button>
      </form>
    </div>
  );
}
