import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authApi from "../api/authApi";

function ProtectedRoute({ children, allowedRole }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");

      // No token? Redirect to login immediately
      if (!token) {
        setIsVerifying(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await authApi.verifyToken();

        // Token is valid
        setIsAuthenticated(true);
        setUserRole(response.data.role);

        // Update localStorage with fresh data from backend
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);

      } catch (error) {
        // Token is invalid/expired
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);

        // Clear invalid token from storage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, []);

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#666"
      }}>
        Verifying authentication...
      </div>
    );
  }

  // Not authenticated? Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role-based access
  if (allowedRole && userRole !== allowedRole) {
    // Redirect based on user's actual role
    return userRole === "ADMIN"
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/orders" replace />;
  }

  // All checks passed, render protected content
  return children;
}

export default ProtectedRoute;
