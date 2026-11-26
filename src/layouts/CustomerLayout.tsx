import {
  BedDouble,
  Bell,
  CalendarCheck,
  History,
  House,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

// Customer sidebar navigation items.
const menuItems = [
  {
    name: "Dashboard",
    path: "/customer",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Browse Rooms",
    path: "/customer/rooms",
    icon: BedDouble,
  },
  {
    name: "My Reservations",
    path: "/customer/reservations",
    icon: CalendarCheck,
  },
  {
    name: "Booking History",
    path: "/customer/history",
    icon: History,
  },
  {
    name: "My Profile",
    path: "/customer/profile",
    icon: UserRound,
  },
];

function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Customer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col overflow-hidden bg-emerald-950 px-5 py-6 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Fixed GrandStay branding */}
        <div className="mb-6 flex shrink-0 items-center border-b border-emerald-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">GrandStay</h1>
            <p className="mt-1 text-sm text-white">Customer Portal</p>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-2 text-white transition hover:bg-emerald-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable navigation menu */}
        <nav className="sidebar-menu-scroll min-h-0 flex-1 overflow-y-auto py-2">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white">
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-700 text-white shadow"
                        : "text-emerald-100 hover:bg-emerald-900"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Fixed Back to Home button */}
        <div className="shrink-0 border-t border-emerald-800 pt-5">
          <NavLink
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900 hover:text-white"
          >
            <House size={20} />
            <span>Back to Home</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-3 py-4 backdrop-blur sm:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            {/* Mobile sidebar toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">Customer Portal</p>
              <h1 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                GrandStay Hotel
              </h1>
            </div>
          </div>

          {/* Customer information and actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-4">
            <button
              type="button"
              className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 sm:block"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="hidden min-w-0 items-center gap-3 border-l border-slate-200 pl-4 md:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-900">
                <UserRound size={20} />
              </div>

              <div className="max-w-36">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user?.fullName ?? "Customer"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.role ?? "CUSTOMER"}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
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

        {/* Child pages render here */}
        <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-[1600px] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default CustomerLayout;
