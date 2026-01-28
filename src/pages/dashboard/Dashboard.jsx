import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBox, FaBell, FaRupeeSign } from "react-icons/fa";

import DashboardCard from "../../components/common_temp/DashboardCard";
import TopProductsChart from "../../components/dashboard/TopProductsChart";

import orderApi from "../../api/OrderApi";
import productApi from "../../api/productApi";
import notificationsApi from "../../api/notificationsApi";

function Dashboard() {
  const navigate = useNavigate();

  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const loadOrders = () => {
      orderApi
        .getAll()
        .then((res) => setOrderCount(res.data.length))
        .catch(() => setOrderCount(0));
    };

    const loadProducts = () => {
      productApi
        .getAll()
        .then((res) => setProductCount(res.data.length))
        .catch(() => setProductCount(0));
    };

    const loadRevenue = () => {
      orderApi
        .revenue()
        .then((res) => setRevenue(res.data))
        .catch(() => setRevenue(0));
    };

    const loadNotifications = () => {
      notificationsApi
        .getAll()
        .then((res) => setNotificationCount(res.data.length))
        .catch(() => setNotificationCount(0));
    };

    // Initial load
    loadOrders();
    loadProducts();
    loadRevenue();
    loadNotifications();

    // Event listeners
    const dashboardListener = () => {
      loadOrders();
      loadRevenue();
    };

    const notificationListener = () => {
      loadNotifications();
    };

    window.addEventListener("refreshDashboard", dashboardListener);
    window.addEventListener("refreshNotifications", notificationListener);

    return () => {
      window.removeEventListener("refreshDashboard", dashboardListener);
      window.removeEventListener("refreshNotifications", notificationListener);
    };
  }, []);

  return (
    <>
      {/* 🔹 TOP CARDS */}
      <div className="dashboard-top-section">
        <div className="dashboard-grid">
          <DashboardCard
            title="Total Orders"
            value={orderCount}
            icon={<FaShoppingCart />}
            color="#4CAF50"
            onClick={() => navigate("/orders")}
          />

          <DashboardCard
            title="Products"
            value={productCount}
            icon={<FaBox />}
            color="#2196F3"
            onClick={() => navigate("/products")}
          />

          <DashboardCard
            title="Revenue"
            value={`₹ ${revenue}`}
            icon={<FaRupeeSign />}
            color="#FF9800"
          />

          <DashboardCard
            title="Notifications"
            value={notificationCount}
            icon={<FaBell />}
            color="#F44336"
            showBadge={notificationCount > 0}
            onClick={() => navigate("/notifications")}
          />
        </div>
      </div>

      {/* 🔹 CHART */}
      <div className="dashboard-chart-section">
        <TopProductsChart />
      </div>
    </>
  );
}

export default Dashboard;
