import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";

// Define which roles are allowed to access a protected route.
interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  allowDuringPasswordReset?: boolean;
}

function ProtectedRoute({
  allowedRoles,
  allowDuringPasswordReset = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  // Wait until the initial authentication check is complete.
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-600">Checking your session...</p>
      </div>
    );
  }

  // Redirect users who are not logged in to the login page.
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect authenticated users who do not have permission.
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/no-access" replace />;
  }

  if (user.mustResetPw && !allowDuringPasswordReset) {
    return <Navigate to="/staff/change-password" replace />;
  }

  // Render the requested page when authentication and role are valid.
  return <Outlet />;
}

export default ProtectedRoute;
