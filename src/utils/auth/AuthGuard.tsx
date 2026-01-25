import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const AuthGuard = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or spinner
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet/>;
};
