import { ChevronDown, House, LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHomeActive =
    location.pathname === "/" && location.hash !== "#booking";

  const navLinkClass = (isActive: boolean) =>
    `transition hover:text-emerald-800 ${
      isActive ? "font-semibold text-emerald-950" : "text-slate-700"
    }`;

  // One staff console for Admin and Receptionist; customers keep their portal.
  const portalLink = (() => {
    if (!isAuthenticated || !user) return null;

    if (user.role === "ADMIN") {
      return { to: "/admin", label: "Staff console" };
    }

    if (user.role === "RECEPTIONIST") {
      return { to: "/staff", label: "Staff console" };
    }

    return { to: "/customer", label: "Customer portal" };
  })();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-1/2 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-330 -translate-x-1/2 flex-wrap items-center justify-between rounded-3xl border border-white/60 bg-white/90 px-5 py-2 shadow-lg backdrop-blur-md sm:px-8 sm:py-2.5"
    >
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="flex items-center gap-2 text-xl font-bold text-emerald-950 sm:text-2xl"
      >
        <span className="flex size-9 items-center justify-center text-emerald-900 sm:size-10">
          <House aria-hidden="true" size={36} strokeWidth={1.7} />
        </span>
        <span className="font-serif">GrandStay</span>
      </Link>

      <div className="hidden items-center gap-7 text-[15px] font-medium lg:flex xl:gap-9">
        <Link
          to="/"
          aria-current={isHomeActive ? "page" : undefined}
          className={`relative inline-flex items-center py-1 ${navLinkClass(isHomeActive)}`}
        >
          Home
          {isHomeActive && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-900"
            />
          )}
        </Link>

        <Link
          to="/#booking"
          className={navLinkClass(location.hash === "#booking")}
        >
          <span className="flex items-center gap-1">
            Rooms
            <ChevronDown aria-hidden="true" size={16} />
          </span>
        </Link>

        <Link to="/#about" className={navLinkClass(location.hash === "#about")}>
          About
        </Link>

        {portalLink && (
          <Link
            to={portalLink.to}
            className={navLinkClass(
              location.pathname.startsWith(portalLink.to) ||
                (portalLink.to === "/admin" &&
                  location.pathname.startsWith("/staff")),
            )}
          >
            {portalLink.label}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
            className="flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-sm"
          >
            <LogOut aria-hidden="true" size={18} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <Link
            to="/login"
            state={{ from: location }}
            onClick={closeMobileMenu}
            className="flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 sm:px-5 sm:text-sm"
          >
            <UserRound aria-hidden="true" size={20} />
            Login
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          className="flex size-10 items-center justify-center rounded-full text-emerald-950 transition hover:bg-emerald-50 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" size={22} />
          ) : (
            <Menu aria-hidden="true" size={22} />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="flex w-full flex-col gap-4 border-t border-slate-200 px-2 pb-3 pt-4 text-sm font-medium lg:hidden"
        >
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={navLinkClass(isHomeActive)}
          >
            Home
          </Link>

          <Link
            to="/#booking"
            onClick={closeMobileMenu}
            className={navLinkClass(location.hash === "#booking")}
          >
            Rooms
          </Link>

          <Link
            to="/#about"
            onClick={closeMobileMenu}
            className={navLinkClass(location.hash === "#about")}
          >
            About
          </Link>

          {portalLink && (
            <Link
              to={portalLink.to}
              onClick={closeMobileMenu}
              className={navLinkClass(
                location.pathname.startsWith(portalLink.to),
              )}
            >
              {portalLink.label}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
