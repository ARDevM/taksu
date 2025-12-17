import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import ProtectedRoute from "./routes/ProtectedRoute";
import RootRedirect from "./routes/RootRedirect";

import SuperDashboard from "./pages/super/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import CustomerDashboard from "./pages/customer/Dashboard";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ ROOT */}
        <Route path="/" element={<Landing />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/super"
          element={
            <ProtectedRoute role="super_admin">
              <SuperDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
