import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./auth/ProtectedRoute";

import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import CreateOrder from "./pages/orders/CreateOrder";
import Payment from "./pages/payments/Payment";
import Notifications from "./pages/Notifications";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="575311412640-1k9ra9k9041reldfklhna7psiqn396k4.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 ADMIN ONLY ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Route>

          {/* 🔐 USER ONLY ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRole="USER">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* USER specifically has nothing unique here anymore if these are shared, 
              but keeping for future expansion or specific USER-only components */}
          </Route>

          {/* 🔐 COMMON PROTECTED ROUTES */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/orders" element={<CreateOrder />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
