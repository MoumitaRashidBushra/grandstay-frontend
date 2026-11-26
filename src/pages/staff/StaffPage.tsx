import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Clock,
  History,
  LogIn,
  LogOut,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import MetricCard from "../../components/MetricCard";
import { useAuth } from "../../hooks/useAuth";

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
    icon: BedDouble,
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

function StaffPage() {
  const { user } = useAuth();

  // Quick links for common front desk activities.
  const quickActions = [
    {
      title: "Find Booking",
      description: "Search an existing reservation",
      path: "/staff/find-booking",
      icon: CalendarCheck,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Arrivals",
      description: "View today's expected guests",
      path: "/staff/arrivals",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Check-in",
      description: "Process guest arrivals",
      path: "/staff/check-in",
      icon: LogIn,
      color: "bg-violet-50 text-violet-700",
    },
    {
      title: "Check-out",
      description: "Process guest departures",
      path: "/staff/check-out",
      icon: LogOut,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome section */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-emerald-700">
            FRONT DESK OVERVIEW
          </p>

          <h1 className="font-serif text-3xl font-bold text-emerald-950">
            Welcome Back, {user?.fullName?.split(" ")[0] ?? "Staff"}!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage daily hotel operations and assist your guests.
          </p>
        </div>

        <NavLink
          to="/staff/find-booking"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          Find Booking
          <ArrowRight size={16} />
        </NavLink>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <MetricCard
            key={item.label}
            title={item.label}
            value={item.value}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </section>

      {/* Daily operations and room status */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">
                Today's Operations
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Daily front desk activities
              </p>
            </div>

            <CalendarDays className="text-emerald-700" size={23} />
          </div>

          <div className="mt-7 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center">
            <Clock size={30} className="text-emerald-700" />

            <h3 className="mt-4 font-semibold text-slate-800">
              No activity information available
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Today's check-in and check-out activities will appear here after
              booking data is connected.
            </p>

            <NavLink
              to="/staff/arrivals"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-950"
            >
              View Arrivals
              <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Room Status</h2>
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
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-5">
          <h2 className="font-semibold text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Access common front desk tasks
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
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

      {/* Recent bookings */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">Recent Bookings</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest guest reservation activities
            </p>
          </div>

          <NavLink
            to="/staff/find-booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-950"
          >
            Find Booking
            <ArrowRight size={16} />
          </NavLink>
        </div>

        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <History size={28} className="text-slate-400" />

          <h3 className="mt-4 font-semibold text-slate-800">
            No booking records available
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Recent guest bookings will appear here once the API is connected.
          </p>
        </div>
      </section>

      {/* Hotel policies from the SRS */}
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
    </div>
  );
}

export default StaffPage;
