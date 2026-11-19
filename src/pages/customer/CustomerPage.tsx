import {
  ArrowRight,
  BedDouble,
  Bell,
  CalendarCheck,
  CalendarDays,
  Clock,
  CreditCard,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";

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

const summaryCards = [
  {
    label: "Total Bookings",
    value: "—",
    description: "Your overall reservations",
    icon: CalendarDays,
  },
  {
    label: "Upcoming Stays",
    value: "—",
    description: "Your upcoming visits",
    icon: CalendarCheck,
  },
  {
    label: "Active Reservations",
    value: "—",
    description: "Currently active bookings",
    icon: Clock,
  },
  {
    label: "Total Payments",
    value: "—",
    description: "Your payment records",
    icon: CreditCard,
  },
];

function CustomerPage() {
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

      {/* Customer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-white">
            <BedDouble size={22} />
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-emerald-950">
              GrandStay
            </h2>
            <p className="text-xs text-slate-500">Customer Portal</p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          <nav className="space-y-1.5">
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
                        ? "bg-emerald-50 text-emerald-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-900"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar bottom */}
        <div className="border-t border-slate-100 p-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-emerald-900"
          >
            <ArrowRight size={19} />
            Back to Home
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs text-slate-500">Customer Portal</p>
              <h1 className="text-sm font-semibold text-slate-800 sm:text-base">
                My Dashboard
              </h1>
            </div>
          </div>

          {/* Customer information and actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
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

            {/* Logout button */}
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
              <p className="mb-2 text-sm font-medium text-emerald-800">
                CUSTOMER OVERVIEW
              </p>

              <h2 className="font-serif text-3xl font-bold text-emerald-950">
                Welcome Back!
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Manage your reservations and plan your next stay with us.
              </p>
            </div>

            <NavLink
              to="/customer/rooms"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              <Search size={17} />
              Explore Rooms
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
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
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

                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
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
            {/* Upcoming Reservation */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Upcoming Reservation
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your next scheduled hotel stay
                  </p>
                </div>

                <CalendarCheck className="text-emerald-800" size={23} />
              </div>

              <div className="mt-7 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                  <CalendarDays size={26} />
                </div>

                <h4 className="font-semibold text-slate-800">
                  No reservation details available
                </h4>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Your upcoming reservation information will appear here once
                  your booking data is connected.
                </p>

                <NavLink
                  to="/customer/rooms"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  Browse available rooms
                  <ArrowRight size={16} />
                </NavLink>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">Quick Actions</h3>
              <p className="mt-1 text-sm text-slate-500">
                Manage your account easily
              </p>

              <div className="mt-6 space-y-3">
                <NavLink
                  to="/customer/rooms"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                >
                  <div className="flex items-center gap-3">
                    <Search size={19} className="text-emerald-800" />
                    <span className="text-sm font-medium">Browse Rooms</span>
                  </div>
                  <ArrowRight size={16} className="text-slate-400" />
                </NavLink>

                <NavLink
                  to="/customer/reservations"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck size={19} className="text-emerald-800" />
                    <span className="text-sm font-medium">My Reservations</span>
                  </div>
                  <ArrowRight size={16} className="text-slate-400" />
                </NavLink>

                <NavLink
                  to="/customer/profile"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                >
                  <div className="flex items-center gap-3">
                    <UserRound size={19} className="text-emerald-800" />
                    <span className="text-sm font-medium">My Profile</span>
                  </div>
                  <ArrowRight size={16} className="text-slate-400" />
                </NavLink>
              </div>
            </div>
          </section>

          {/* Recent Booking History */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Recent Booking History
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Review your previous reservations
                </p>
              </div>

              <NavLink
                to="/customer/history"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
              >
                View History
                <ArrowRight size={16} />
              </NavLink>
            </div>

            <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <History size={25} />
              </div>

              <h4 className="font-semibold text-slate-800">
                No booking history available
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                Your previous bookings will appear here.
              </p>
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

export default CustomerPage;
