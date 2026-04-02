import { useAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
}