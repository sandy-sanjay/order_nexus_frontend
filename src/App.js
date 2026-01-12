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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 PROTECTED DASHBOARD ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<CreateOrder />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
