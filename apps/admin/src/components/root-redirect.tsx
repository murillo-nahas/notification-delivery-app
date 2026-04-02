import { Navigate } from "react-router";
import { useAuth } from "@/contexts/auth-context";

export default function RootRedirect() {
  const { user } = useAuth();

  return <Navigate to={user ? "/home" : "/login"} />;
}