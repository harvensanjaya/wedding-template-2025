import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If there is no token, redirect to login
  // The 'replace' prop prevents the user from clicking "back" to the locked page
  if (!token) {
    return <Navigate to='/login' replace />;
  }

  // If the token exists, render the child routes (AdminPage)
  return <Outlet />;
};

export default ProtectedRoute;
