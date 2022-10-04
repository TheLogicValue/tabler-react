import { Navigate, Outlet } from "react-router-dom";
import React from 'react';

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};