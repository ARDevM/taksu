import { Navigate } from "react-router-dom";
import { getAuth } from "../store/auth";

export default function ProtectedRoute({ role, children }) {
  const auth = getAuth();

  // ❌ Belum login
  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role tidak sesuai
  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Lolos
  return children;
}
