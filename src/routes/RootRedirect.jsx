import { Navigate } from "react-router-dom";
import { getUser } from "../store/auth";

export default function RootRedirect() {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "super_admin") return <Navigate to="/super" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;

  return <Navigate to="/customer" replace />;
}
