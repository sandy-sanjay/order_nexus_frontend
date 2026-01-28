import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../../styles/DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE CONTENT */}
      <div className="content-wrapper">
        
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="page-container">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;