import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/register", form);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <form onSubmit={submit} className="bg-neutral-800 p-8 rounded-xl w-96">
        <h1 className="text-xl text-white mb-4">Register Customer</h1>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key.includes("password") ? "password" : "text"}
            className="w-full p-2 mb-3 rounded bg-neutral-700 text-white"
            placeholder={key.replace("_", " ")}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}

        <button className="w-full bg-green-600 p-2 rounded text-white">
          Register
        </button>
      </form>
    </div>
  );
}
