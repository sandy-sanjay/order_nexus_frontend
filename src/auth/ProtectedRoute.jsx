import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If a specific role is required and the user doesn't have it
  if (allowedRole && userRole !== allowedRole) {
    // Redirect logic: If admin tries to go to user pages or vice versa
    return userRole === "ADMIN" ? <Navigate to="/dashboard" replace /> : <Navigate to="/orders" replace />;
  }

  return children;
}

export default ProtectedRoute;
