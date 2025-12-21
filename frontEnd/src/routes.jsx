import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // أضفنا Navigate هنا

import { useNavigateContext } from "./context/navigateContext";
import Cookies from "js-cookie";

// public pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// pages protected
import DashboardLayout from "./pages/DashboardLayout";
import AccommodationForm from "./component/AccommodationForm";
import Payments from "./component/Payments";
import PaymentsHistory from "./component/PaymentsHistory";
import Settings from "./component/Settings";
import ConstructionRequest from "./component/ConstructionRequest";
import UserProfile from "./component/Account";
import Notifications from "./component/Notifications";
import Contact from "./component/Contact";
import Logout from "./pages/auth/Logout";

  function ProtectedRoute({ children }) {
  const cookies = Cookies.get();
  const token = cookies.token;

  // redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {

  const Navigate = useNavigateContext();


  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* الصفحات المحمية - يجب تسجيل الدخول للوصول إليها */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Navigate to="/DashboardLayout" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accommodation-form"
        element={
          <ProtectedRoute>
            <AccommodationForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments-history"
        element={
          <ProtectedRoute>
            <PaymentsHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Construction"
        element={
          <ProtectedRoute>
            <ConstructionRequest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Account"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        } />


      <Route
        path="/DashboardLayout"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />





    </Routes>
  );
}