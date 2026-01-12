import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./sidebar.css";
import notificationApi from "../../api/notificationsApi";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [unreadCount, setUnreadCount] = useState(0);
  const role = localStorage.getItem("role"); // ADMIN or USER

  const fetchUnreadCount = () => {
    notificationApi.unreadCount()
      .then(res => setUnreadCount(res.data))
      .catch(() => setUnreadCount(0));
  };

  useEffect(() => {
    fetchUnreadCount();

    const listener = () => fetchUnreadCount();
    window.addEventListener("refreshNotifications", listener);

    return () => {
      window.removeEventListener("refreshNotifications", listener);
    };
  }, []);

  return (
    <div className="sidebar">
      <h2>Order Nexus</h2>

      <ul>

        {/* ================= ADMIN MENU ================= */}
        {role === "ADMIN" && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/payments">Payments</Link></li>

          </>
        )}

        {/* ================= USER MENU ================= */}
        {role === "USER" && (
          <>
            <li><Link to="/orders">Place Order</Link></li>
            <li><Link to="/payments">Payments</Link></li>
          </>
        )}

        {/* ================= COMMON ================= */}
        <li>
          <Link to="/notifications">
            Notifications
            {unreadCount > 0 && (
              <span style={{
                marginLeft: "8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 8px",
                fontSize: "12px"
              }}>
                {unreadCount}
              </span>
            )}
          </Link>
        </li>

        {/* ================= LOGOUT (USER ONLY) ================= */}
        {role === "USER" && (
          <li>
            <Link to="/" onClick={handleLogout} className="logout-link">
              Logout
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;
