import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  CreditCard,
  History,
  Search,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Dashboard summary cards.
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

function CustomerDashboardPage() {
  return (
    <div className="space-y-8">
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

              <p className="mt-4 text-xs text-slate-500">{item.description}</p>
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
              Your upcoming reservation information will appear here once your
              booking data is connected.
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
                <Search size={19} className="text-emerald-800" />
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
    </div>
  );
}

export default CustomerDashboardPage;
