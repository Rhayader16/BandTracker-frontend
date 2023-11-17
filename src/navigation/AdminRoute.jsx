import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function AdminRoute() {
  const { user, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default AdminRoute;
