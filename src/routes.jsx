import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

function ProtectedRoute({ children }) {
  const [cookies] = useCookies(["token"]);
  if (!cookies.token) return <Navigate to="/dashboard" />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
    </Routes>
  );
}
