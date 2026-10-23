import { Navigate, Outlet } from "react-router-dom";
import React from 'react';
import type { To } from "react-router-dom";

export type ProtectedRouteProps = {
  readonly isAllowed: boolean;
  readonly redirectTo?: To;
  readonly replace?: boolean;
  readonly children?: React.ReactNode;
};

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/",
  replace = true,
  children,
}: ProtectedRouteProps): React.ReactNode => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace={replace} />;
  }

  return children ? children : <Outlet />;
};
