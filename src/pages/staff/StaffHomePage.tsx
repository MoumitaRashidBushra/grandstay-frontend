import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AdminPage from "../admin/AdminPage";
import StaffDashboardPage from "./StaffDashboardPage";

function StaffHomePage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "ADMIN") {
    return <AdminPage />;
  }

  return <StaffDashboardPage />;
}

export default StaffHomePage;
