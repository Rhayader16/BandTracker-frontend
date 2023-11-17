import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function LoggedOutUser() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading... </p>;
  }
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default LoggedOutUser;
