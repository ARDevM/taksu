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
      window.location.href =
        role === "super_admin"
          ? "/super"
          : role === "admin"
          ? "/admin"
          : "/customer";
    } catch {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center font-serif">
      <form
        onSubmit={submit}
        className="w-96 border border-neutral-800 p-8 bg-white"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Member Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          className="w-full mb-4 p-2 border border-neutral-700"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-6 p-2 border border-neutral-700"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-2 bg-neutral-800 text-white hover:bg-neutral-700">
          Masuk
        </button>
      </form>
    </div>
  );
}
