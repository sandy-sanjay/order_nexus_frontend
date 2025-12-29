import { useLocation } from "react-router-dom";
import "../../styles/navbar.css";

function Navbar() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("products")) return "Products";
    if (location.pathname.includes("orders")) return "Orders";
    if (location.pathname.includes("payments")) return "Payments";
    if (location.pathname.includes("notifications")) return "Notifications";
    return "";
  };

  return (
    <div className="navbar">
      {/* Page Title */}
      <h2 className="navbar-title">{getTitle()}</h2>
    
      {/* Admin User */}
      <div className="navbar-user">
        <span className="navbar-username">Admin User</span>
        <div className="navbar-avatar">A</div>
      </div>
    </div>
  );
}

export default Navbar;
