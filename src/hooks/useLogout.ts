import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { useAuth } from "./useAuth";

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Prevent multiple logout requests immediately.
  const logoutStarted = useRef(false);

  const handleLogout = async () => {
    if (logoutStarted.current) {
      return;
    }

    logoutStarted.current = true;
    setIsLoggingOut(true);

    try {
      // Ask the backend to revoke the current session.
      await logoutUser();
    } catch (error) {
      // The backend logout may fail, but local logout must still happen.
      console.error("Logout API failed:", error);
    } finally {
      // Clear the frontend authentication state.
      logout();

      // Redirect the user to the login page.
      navigate("/login", { replace: true });

      setIsLoggingOut(false);
      logoutStarted.current = false;
    }
  };

  return { handleLogout, isLoggingOut };
}
