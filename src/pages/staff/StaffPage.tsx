import {
  ArrowRight,
  BedDouble,
  Bell,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  History,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";

// Staff sidebar navigation.
const menuItems = [
  { name: "Dashboard", path: "/staff", icon: LayoutDashboard, end: true },
  { name: "Room Management", path: "/staff/rooms", icon: BedDouble },
  { name: "Bookings", path: "/staff/bookings", icon: CalendarCheck },
  { name: "Check-in", path: "/staff/check-in", icon: LogIn },
  { name: "Check-out", path: "/staff/check-out", icon: LogOut },
  { name: "My Profile", path: "/staff/profile", icon: UserRound },
];

// Dashboard summary cards.
const summaryCards = [
  {
    label: "Total Rooms",
    value: "—",
    description: "Hotel room inventory",
    icon: BedDouble,
  },
  {
    label: "Available Rooms",
    value: "—",
    description: "Rooms ready for guests",
    icon: CheckCircle2,
  },
  {
    label: "Occupied Rooms",
    value: "—",
    description: "Currently occupied rooms",
    icon: Users,
  },
  {
    label: "Pending Check-ins",
    value: "—",
    description: "Today's expected arrivals",
    icon: CalendarCheck,
  },
];

// Room status information.
const roomStatuses = [
  { label: "Available", color: "bg-emerald-500" },
  { label: "Occupied", color: "bg-blue-500" },
  { label: "Maintenance", color: "bg-amber-500" },
];

function StaffPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Call backend logout API and clear local authentication.
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Staff Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col overflow-hidden bg-emerald-950 px-5 py-6 text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Branding */}
        <Link
          to="/"
          className="mb-6 flex shrink-0 items-center gap-3 border-b border-emerald-800 pb-6"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800">
            <BedDouble size={23} />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold tracking-wide">
              GrandStay
            </h2>
            <p className="text-xs text-emerald-200">
              Hotel Booking & Reservation
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-emerald-300">
              Staff Portal
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setSidebarOpen(false);
            }}
            className="ml-auto rounded-lg p-2 text-emerald-200 transition hover:bg-emerald-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-menu-scroll min-h-0 flex-1 overflow-y-auto py-2">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Staff Menu
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
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-700 text-white shadow"
                        : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
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

        {/* Back to Home */}
        <div className="shrink-0 border-t border-emerald-800 pt-5">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900 hover:text-white"
          >
            <House size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                GrandStay Staff
              </h2>
              <p className="text-sm text-slate-500">Staff Operations Panel</p>
            </div>
          </div>

          {/* Staff information and actions */}
          <div className="flex items-center gap-2 sm:gap-5">
            <button
              type="button"
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={21} />
            </button>

            <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <UserRound size={20} />
              </div>

              <div className="max-w-36">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user?.fullName ?? "Staff Member"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.role ?? "RECEPTIONIST"}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
            >
              <LogOut size={18} />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="mx-auto max-w-7xl space-y-8 p-5 sm:p-8">
          {/* Welcome Section */}
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-emerald-700">
                STAFF OVERVIEW
              </p>

              <h2 className="font-serif text-3xl font-bold text-emerald-950">
                Welcome Back, {user?.fullName?.split(" ")[0] ?? "Staff"}!
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Manage daily hotel operations and keep everything running
                smoothly.
              </p>
            </div>

            <NavLink
              to="/staff/bookings"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              <CalendarCheck size={17} />
              Manage Bookings
              <ArrowRight size={16} />
            </NavLink>
          </section>

          {/* Summary Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.label}
                      </p>

                      <h3 className="mt-3 text-3xl font-bold text-slate-900">
                        {item.value}
                      </h3>
                    </div>

                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                      <Icon size={21} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Main Dashboard Grid */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Today's Operations */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Today's Operations
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Monitor your daily front desk activities
                  </p>
                </div>

                <CalendarDays className="text-emerald-700" size={23} />
              </div>

              <div className="mt-7 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Clock size={26} />
                </div>

                <h4 className="font-semibold text-slate-800">
                  No activity information available
                </h4>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Today's check-in and check-out activities will appear here
                  when booking data is connected.
                </p>

                <NavLink
                  to="/staff/bookings"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-950"
                >
                  View Bookings
                  <ArrowRight size={16} />
                </NavLink>
              </div>
            </div>

            {/* Room Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Room Status</h3>
                <BedDouble size={22} className="text-emerald-700" />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Current room availability
              </p>

              <div className="mt-7 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
                <BedDouble size={32} className="text-slate-300" />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  Room data unavailable
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Room statistics will appear here after connecting the API.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {roomStatuses.map((room) => (
                  <div
                    key={room.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${room.color}`}
                      />
                      <span className="text-sm text-slate-600">
                        {room.label}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      —
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="mb-5">
              <h3 className="font-semibold text-slate-900">Quick Actions</h3>
              <p className="mt-1 text-sm text-slate-500">
                Access your daily tasks quickly
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Manage Rooms",
                  description: "View room status",
                  path: "/staff/rooms",
                  icon: BedDouble,
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  title: "Bookings",
                  description: "Manage reservations",
                  path: "/staff/bookings",
                  icon: CalendarCheck,
                  color: "bg-blue-50 text-blue-700",
                },
                {
                  title: "Check-in",
                  description: "Guest arrivals",
                  path: "/staff/check-in",
                  icon: LogIn,
                  color: "bg-violet-50 text-violet-700",
                },
                {
                  title: "Check-out",
                  description: "Guest departures",
                  path: "/staff/check-out",
                  icon: LogOut,
                  color: "bg-amber-50 text-amber-700",
                },
              ].map((action) => {
                const Icon = action.icon;

                return (
                  <NavLink
                    key={action.title}
                    to={action.path}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-3 ${action.color}`}>
                        <Icon size={21} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {action.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-800"
                    />
                  </NavLink>
                );
              })}
            </div>
          </section>

          {/* Recent Bookings */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Recent Bookings
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Latest guest reservation activities
                </p>
              </div>

              <NavLink
                to="/staff/bookings"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-950"
              >
                View All Bookings
                <ArrowRight size={16} />
              </NavLink>
            </div>

            <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <History size={25} />
              </div>

              <h4 className="font-semibold text-slate-800">
                No booking records available
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                Recent guest bookings will appear here once the API is
                connected.
              </p>
            </div>
          </section>

          {/* Hotel Policies */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <LogIn size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700">
                  Check-in Policy
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Standard check-in time: 2:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <LogOut size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700">
                  Check-out Policy
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Standard check-out time: 12:00 PM
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} GrandStay Hotel. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}

export default StaffPage;
