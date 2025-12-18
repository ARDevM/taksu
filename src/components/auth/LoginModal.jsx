// src/components/auth/LoginModal.jsx
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import useForm from "../../hooks/useForm";
import { saveAuth } from "../../store/auth";

export default function LoginModal({ open, onClose }) {
  const { form, setField, submit, loading } = useForm({
    email: "",
    password: "",
  });

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submit((payload) => api.post("/login", payload));
      const role = res.data.role;

      // This modal is intended for CUSTOMER only
      if (role !== "customer") {
        toast.error("Login ini khusus untuk customer.");
        return;
      }

      // save auth + set axios header
      saveAuth({
        token: res.data.token,
        user: res.data.user,
        role,
      });
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      toast.success("Login berhasil. Selamat datang!");
      onClose();

      // small delay then reload or redirect
      setTimeout(() => {
        // reload so Landing reads updated auth
        window.location.href = "/";
      }, 600);
    } catch (err) {
      // useForm already handles errors & toasts
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 relative font-serif">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">✕</button>

        <h2 className="text-2xl font-bold text-center mb-6">Member Login</h2>

        <form onSubmit={onSubmit}>
          <input
            className="w-full mb-4 p-3 border rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            className="w-full mb-6 p-3 border rounded"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-[#1f3d2b] text-white rounded hover:bg-[#2f5a40] transition ${loading ? "opacity-60" : ""}`}
          >
            {loading ? "Processing..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
