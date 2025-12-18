// src/auth/register.jsx
import { toast } from "react-hot-toast";
import api from "../api/axios";
import useForm from "../hooks/useForm";

export default function Register() {
  const {
    form,
    setField,
    submit,
    loading,
    errors,
    generalError,
  } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "customer",
  });

  const fieldError = (f) => errors?.[f]?.[0] ?? null;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit((payload) => api.post("/register", payload));
      toast.success("Registrasi berhasil. Silakan cek email untuk verifikasi.");
      // redirect after tiny delay so toast visible
      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    } catch (err) {
      // errors handled in useForm; no extra action required here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f3] font-serif">
      <form
        className="bg-white p-8 rounded-2xl w-96 shadow-xl"
        onSubmit={onSubmit}
        aria-busy={loading}
      >
        <h1 className="text-xl font-bold mb-6 text-center">Register Customer</h1>

        {generalError && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            {generalError}
          </div>
        )}

        <label className="block mb-2 text-xs font-semibold">Name</label>
        <input
          className={`w-full p-3 mb-1 border rounded ${fieldError("name") ? "border-red-400" : "border-gray-200"}`}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          disabled={loading}
        />
        {fieldError("name") && <p className="text-xs text-red-600 mb-3">{fieldError("name")}</p>}

        <label className="block mb-2 text-xs font-semibold">Email</label>
        <input
          className={`w-full p-3 mb-1 border rounded ${fieldError("email") ? "border-red-400" : "border-gray-200"}`}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          disabled={loading}
        />
        {fieldError("email") && <p className="text-xs text-red-600 mb-3">{fieldError("email")}</p>}

        <label className="block mb-2 text-xs font-semibold">Password</label>
        <input
          type="password"
          className={`w-full p-3 mb-1 border rounded ${fieldError("password") ? "border-red-400" : "border-gray-200"}`}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setField("password", e.target.value)}
          disabled={loading}
        />
        {fieldError("password") && <p className="text-xs text-red-600 mb-3">{fieldError("password")}</p>}

        <label className="block mb-2 text-xs font-semibold">Confirm Password</label>
        <input
          type="password"
          className={`w-full p-3 mb-4 border rounded ${fieldError("password_confirmation") ? "border-red-400" : "border-gray-200"}`}
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={(e) => setField("password_confirmation", e.target.value)}
          disabled={loading}
        />
        {fieldError("password_confirmation") && <p className="text-xs text-red-600 mb-3">{fieldError("password_confirmation")}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1f3d2b] hover:bg-[#2f5a40]"
          } transition`}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>
    </div>
  );
}
