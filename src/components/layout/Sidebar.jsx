import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "./sidebar.css";
function Sidebar() {

  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = () => {
    api.get("http://localhost:8085/api/notifications/unread-count")
      .then(res => setUnreadCount(res.data))
      .catch(() => {});
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
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/payments">Payments</Link></li>

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

        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
