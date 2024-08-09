import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { FC } from "react";

interface ProtectedRouteType {
  element: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedRouteType> = ({ element }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? element : <Navigate to="/login" replace />;
};
