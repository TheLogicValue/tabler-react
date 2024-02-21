import { Navigate, Outlet } from "react-router-dom";
import React from 'react';

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/",
  replace = true,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace={replace} />;
  }

  return children ? children : <Outlet />;
};