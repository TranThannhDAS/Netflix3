import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// public protect routes
function PublicProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}

// admin protect routes
function AdminProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/*" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
export { PublicProtectedRoutes, AdminProtectedRoutes };
