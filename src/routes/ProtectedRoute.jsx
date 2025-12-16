import { Navigate } from "react-router-dom";
import { getUser } from "../store/auth";

export default function ProtectedRoute({ role, children }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;
  return children;
}
