// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

import { Outlet } from "react-router-dom";

// type Props = {
//   allowedRoles: Array<"student" | "teacher" | "assistant" | "admin">;
// };

// export const RoleGuard = ({ allowedRoles }: Props) => {
export const RoleGuard = () => {
  // const { user } = useAuth();

  // if (!allowedRoles.includes(user!)) {
  //   return <Navigate to="/403" replace />;
  // }

  return <Outlet />;
};
