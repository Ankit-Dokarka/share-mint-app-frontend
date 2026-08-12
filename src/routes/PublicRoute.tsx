import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/auth/AuthContext";

export default function PublicRoute() {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
