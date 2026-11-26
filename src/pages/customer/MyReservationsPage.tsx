import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import MetricCard from "../../components/MetricCard";

const reservationStats = [
  {
    title: "Total Reservations",
    value: "—",
    description: "All your reservations",
    icon: CalendarDays,
  },
  {
    title: "Upcoming Stays",
    value: "—",
    description: "Your upcoming bookings",
    icon: CalendarCheck,
  },
  {
    title: "Pending Check-in",
    value: "—",
    description: "Reservations to check in",
    icon: Clock,
  },
];

function MyReservationsPage() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Customer Portal / My Reservations
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Reservations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              View and manage your hotel reservations in one place.
            </p>
          </div>

          <NavLink
            to="/customer/rooms"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            Browse Rooms
            <ArrowRight size={17} />
          </NavLink>
        </div>
      </section>

      {/* Reservation summary */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {reservationStats.map((stat) => {
          return (
            <MetricCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          );
        })}
      </section>

      {/* Reservation list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Reservation List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All your hotel booking details will appear here.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-400"
            >
              <Search size={16} />
              Search
            </button>

            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-400"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Reservation table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Booking Reference",
                  "Room Category",
                  "Check-in",
                  "Check-out",
                  "Guests",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* Empty state until real reservation API is connected */}
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <ClipboardList size={30} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            No Reservations Yet
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven't made any reservations yet. Once you book a room, your
            reservation details and booking status will appear here.
          </p>

          <NavLink
            to="/customer/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-800 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
          >
            Explore Available Rooms
            <ArrowRight size={17} />
          </NavLink>
        </div>
      </section>

      {/* Helpful note */}
      <div className="rounded-xl border border-slate-200 bg-slate-100/70 p-4">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-slate-800">
            Reservation information:
          </span>{" "}
          Your booking reference, room details, stay dates and reservation
          status will be available here after a successful booking.
        </p>
      </div>
    </div>
  );
}

export default MyReservationsPage;
