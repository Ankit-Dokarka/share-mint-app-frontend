import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function VerificationRoute() {
  const { user } = useAuth();
  const location = useLocation();

  const fromSignup = location.state?.fromSignup;

  if (!fromSignup) {
    return <Navigate to={user ? "/dashboard" : "/"} replace />;
  }

  return <Outlet />;
}
