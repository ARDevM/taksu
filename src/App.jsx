import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./auth/login";
import Register from "./auth/register";
import ProtectedRoute from "./routes/ProtectedRoute";
// import RootRedirect from "./routes/RootRedirect";

import SuperDashboard from "./pages/super/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Landing from "./pages/Landing";
import BookCafePage from "./pages/bookCafe";

import VerificationHandler from "./components/VerificationHandler";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <VerificationHandler />
      <Routes>

        {/* ✅ ROOT */}
        <Route path="/" element={<Landing />} />
        <Route path="/pustaka" element={<BookCafePage />} />


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


      </Routes>
    </BrowserRouter>
  );
}
