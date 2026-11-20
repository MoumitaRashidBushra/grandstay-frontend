import { ChevronDown, House, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Log out from the backend and clear the frontend session.
  const handleLogout = async () => {
    try {
      // Ask the backend to revoke the refresh token.
      await logoutUser();
    } catch (error) {
      // Continue clearing the local session even if the API request fails.
      console.error("Logout request failed:", error);
    } finally {
      // Clear the user and access token from React Context.
      logout();

      // Redirect the user to the login page.
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-1/2 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-330 -translate-x-1/2 items-center justify-between rounded-3xl border border-white/60 bg-white/90 px-5 py-2 shadow-lg backdrop-blur-md sm:px-8 sm:py-2.5"
    >
      {/* GrandStay logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-emerald-950 sm:text-2xl"
      >
        <span className="flex size-9 items-center justify-center text-emerald-900 sm:size-10">
          <House aria-hidden="true" size={36} strokeWidth={1.7} />
        </span>
        <span className="font-serif">GrandStay</span>
      </Link>

      {/* Public and role-based navigation links */}
      <div className="hidden items-center gap-7 text-[15px] font-medium text-slate-700 lg:flex xl:gap-9">
        <Link
          to="/"
          className="relative inline-flex items-center py-1 text-emerald-950"
        >
          Home
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-900"
          />
        </Link>

        <a
          href="#booking"
          className="flex items-center gap-1 transition hover:text-emerald-800"
        >
          Rooms
          <ChevronDown size={16} />
        </a>

        <a href="#about" className="transition hover:text-emerald-800">
          About
        </a>

        {/* Show only the portal allowed for the logged-in user's role. */}
        {isAuthenticated && user?.role === "ADMIN" && (
          <Link to="/admin" className="transition hover:text-emerald-800">
            Admin portal
          </Link>
        )}

        {isAuthenticated && user?.role === "RECEPTIONIST" && (
          <Link to="/staff" className="transition hover:text-emerald-800">
            Staff portal
          </Link>
        )}

        {isAuthenticated && user?.role === "CUSTOMER" && (
          <Link to="/customer" className="transition hover:text-emerald-800">
            Customer portal
          </Link>
        )}
      </div>

      {/* Show Login or Logout depending on authentication status. */}
      {isAuthenticated ? (
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 sm:px-5 sm:text-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 sm:px-5 sm:text-sm"
        >
          <UserRound size={20} />
          Login
        </Link>
      )}
    </nav>
  );
}
