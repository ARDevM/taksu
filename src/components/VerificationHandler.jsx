import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { saveAuth } from "../store/auth";

/**
 * Simple toast — inline, tailwind
 */
function Toast({ message, onClose, success = true }) {
  return (
    <div className={`fixed top-6 right-6 z-50 max-w-sm p-4 rounded-md shadow-lg ${success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="font-semibold">{message}</div>
        </div>
        <button onClick={onClose} className="opacity-90">✕</button>
      </div>
    </div>
  );
}

export default function VerificationHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const handledVt = useRef(new Set()); // mencegah double-handle

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const verified = qs.get("verified");
    const vt = qs.get("vt"); // one-time key dari backend

    if (!verified) return;

    // Bersihkan query agar tidak terpanggil ulang
    const cleanPath = location.pathname;
    navigate(cleanPath + location.hash, { replace: true });

    if (vt) {
      // jika vt sudah diproses jangan ulangi
      if (handledVt.current.has(vt)) return;
      handledVt.current.add(vt);

      const callComplete = async (attempt = 1) => {
        try {
          const res = await api.post("/verification/complete", { vt });
          const { token, user, role } = res.data;

          // Simpan auth dan atur header axios
          saveAuth({ token, user, role });
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setToast({ message: "Email terverifikasi. Anda berhasil login.", success: true });

          // redirect according to role
          setTimeout(() => {
            if (role === "super_admin") {
              window.location.href = "/super";
            } else if (role === "admin") {
              window.location.href = "/admin";
            } else {
              window.location.href = "/";
            }
          }, 900);
        } catch (err) {
          const status = err?.response?.status;
          const serverMsg = err?.response?.data?.message;

          // jika vt expired (403) -> coba sekali lagi setelah delay kecil (mungkin race)
          if (status === 403 && attempt === 1) {
            // retry once
            setTimeout(() => callComplete(2), 600);
            return;
          }

          // jika tetap gagal, berikan pesan yang ramah
          // cek apakah serverMsg menunjukkan sudah verified (edge case)
          if (serverMsg && serverMsg.toLowerCase().includes("already verified")) {
            setToast({ message: "Email sudah diverifikasi. Silakan login.", success: true });
            setTimeout(() => window.location.href = "/", 900);
            return;
          }

          // fallback: tampilkan message ramah, bukan error teknis
          setToast({ message: "Verifikasi berhasil. Silakan login untuk melanjutkan.", success: true });
          // jangan redirect agresif, beri user waktu untuk login manual
        }
      };

      callComplete();
    } else {
      setToast({ message: "Email berhasil diverifikasi. Silakan login.", success: true });
      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    }
  }, [location.search, navigate, location.pathname, location.hash]);

  if (!toast) return null;
  return <Toast message={toast.message} success={toast.success} onClose={() => setToast(null)} />;
}
