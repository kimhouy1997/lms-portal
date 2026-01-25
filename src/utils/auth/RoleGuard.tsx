import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  allowedRoles: Array<"student" | "teacher" | "assistant" | "admin">;
};

export const RoleGuard = ({ allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
