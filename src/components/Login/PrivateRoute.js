import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) =>
    JSON.parse(localStorage.getItem("user") || 0)
  );
  console.log(user);
  const location = useLocation();
  return user.success ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
