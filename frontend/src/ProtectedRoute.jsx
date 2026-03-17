import { Navigate } from "react-router-dom";

// This component wraps routes that need authentication
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the protected component
  return children;
}