// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = JSON.parse(localStorage.getItem("userRole")); // store role at login

  if (!token) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // logged in but wrong role
    return <Navigate to="/login" replace />;
  }

  return children;
}
