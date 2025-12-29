import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />
     <div className="main-content"></div>
      {/* Main Content Area */}
      <div style={{ flex: 1, background: "#ffffff" }}>
        {/* Top Navbar (Admin User only) */}
        <Navbar />
      <div className="page-content"></div>
        {/* 🔑 PAGE CONTAINER – CONTROLS ALL SPACING */}
      <div style={{ padding: "24px 32px" }}>
  <Outlet />
</div>



      </div>
    </div>
  );
}

export default DashboardLayout;
