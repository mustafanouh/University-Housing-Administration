import React from "react";
import { Routes, Route } from "react-router-dom";

import { useNavigateContext } from "./context/navigateContext";
// get cookies
import Cookies from "js-cookie";


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
import Contact from "./component/Contact";




function ProtectedRoute({ children }) {
  const cookies = Cookies.get(); 
  if (!cookies.token) return <Navigate to="/login" />;
  return children;
}

export default function AppRoutes() {
  const Navigate = useNavigateContext();
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
      <Route path="/Contact" element={<Contact />} />   

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
