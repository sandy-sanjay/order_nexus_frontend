import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import DashboardCard from "../../components/common_temp/DashboardCard";
import { FaShoppingCart, FaBox, FaBell, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopProductsChart from "../../components/dashboard/TopProductsChart";

function Dashboard() {
  const navigate = useNavigate();

  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const loadOrders = () => {
      api.get("http://localhost:8083/api/orders")
        .then(res => setOrderCount(res.data.length))
        .catch(() => setOrderCount(0));
    };

    const loadProducts = () => {
      api.get("http://localhost:8082/api/products")
        .then(res => setProductCount(res.data.length))
        .catch(() => setProductCount(0));
    };

    const loadRevenue = () => {
      api.get("http://localhost:8083/api/orders/revenue")
        .then(res => setRevenue(res.data))
        .catch(() => setRevenue(0));
    };

    const loadNotifications = () => {
      api.get("http://localhost:8085/api/notifications")
        .then(res => setNotificationCount(res.data.length))
        .catch(() => setNotificationCount(0));
    };

    const dashboardListener = () => {
      loadOrders();
      loadRevenue();
    };

    const notificationListener = () => {
      loadNotifications();
    };

    loadOrders();
    loadProducts();
    loadRevenue();
    loadNotifications();

    window.addEventListener("refreshDashboard", dashboardListener);
    window.addEventListener("refreshNotifications", notificationListener);

    return () => {
      window.removeEventListener("refreshDashboard", dashboardListener);
      window.removeEventListener("refreshNotifications", notificationListener);
    };
  }, []);

  return (
    <>
      {/* 🔹 SPACE ONLY BELOW NAVBAR */}
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

      {/* 🔹 CHART SECTION (UNCHANGED POSITION) */}
      <div className="dashboard-chart-section">
        <TopProductsChart />
      </div>
    </>
  );
}

export default Dashboard;
