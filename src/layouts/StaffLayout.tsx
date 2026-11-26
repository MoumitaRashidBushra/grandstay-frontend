import { LogOut, Menu, UserRound } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import StaffSidebar from "../components/staff/StaffSidebar";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Shared role-based sidebar */}
      <StaffSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex min-h-screen min-w-0 flex-col lg:ml-72">
        {/* Shared topbar */}
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-4 shadow-sm sm:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Open navigation"
              aria-expanded={sidebarOpen}
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-800 sm:text-lg">
                GrandStay {isAdmin ? "Management" : "Staff"}
              </h2>
              <p className="hidden text-sm text-slate-500 sm:block">
                {isAdmin ? "Administration Panel" : "Staff Operations Panel"}
              </p>
            </div>
          </div>

          {/* Current user and logout */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-5">
            <div className="hidden min-w-0 items-center gap-3 border-l border-slate-200 pl-4 md:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <UserRound size={20} />
              </div>

              <div className="min-w-0">
                <p className="max-w-40 truncate text-sm font-semibold text-slate-800">
                  {user?.fullName ?? "Staff Member"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.role ?? "STAFF"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={isLoggingOut}
              aria-label={isLoggingOut ? "Logging out" : "Logout"}
              className="flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </header>

        {/* Child route content */}
        <main className="min-w-0 flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StaffLayout;
