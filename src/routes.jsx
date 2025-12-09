import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";


// import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

import AccommodationForm from "./component/AccommodationForm";


import Payments from "./component/Payments";
import PaymentsHistory from "./component/PaymentsHistory"
import Settings from "./component/Settings";
import ConstructionRequest from "./component/ConstructionRequest";
import UserProfile from "./component/Account";

import Notifications from "./component/Notifications";




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
      <Route path="/logout" element={<Logout />} />
      <Route path="/accommodation-form" element={<AccommodationForm />} />
      <Route path="/Notifications" element={<Notifications />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/payments-history" element={<PaymentsHistory />} />
      <Route path="/Construction" element={<ConstructionRequest />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Account" element={<UserProfile />} />
    

      {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
    </Routes>
  );
}
