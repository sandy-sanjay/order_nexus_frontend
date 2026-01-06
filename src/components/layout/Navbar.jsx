import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ important
  const isDashboard = location.pathname === "/dashboard";

  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "ﾠDashboard";
    if (location.pathname.includes("products")) return "ﾠProducts";
    if (location.pathname.includes("orders")) return "ﾠOrders";
    if (location.pathname.includes("payments")) return "ﾠPayments";
    if (location.pathname.includes("notifications")) return "ﾠNotifications";
    return "";
  };
 const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};

   

  return (
    <div className="navbar">
      <h1 className="page-title">{getTitle()}</h1>

      {isDashboard && (
        <div className="admin-bar">
          <div className="welcome-card">
            
            {/* ✅ AVATAR (IMAGE ONLY) */}
            <div className="welcome-avatar">
              <img
                src="/images/adminlogo.jpg"
                alt="Admin"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            {/* ✅ TEXT CONTENT */}
            <div className="welcome-text">
              <span className="welcome-sub">Welcome back,</span>
              <span className="welcome-name">SANJAY S</span>
              <span className="welcome-badge">Admin</span>
            </div>
          </div>

          <button className="signout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;