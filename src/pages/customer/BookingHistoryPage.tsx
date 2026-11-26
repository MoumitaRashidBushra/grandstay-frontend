import {
  Archive,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import MetricCard from "../../components/MetricCard";

// Summary information will be populated from the backend API later.
const historyStats = [
  {
    title: "Total Bookings",
    value: "—",
    description: "Your booking history",
    icon: CalendarDays,
  },
  {
    title: "Completed Stays",
    value: "—",
    description: "Successfully completed stays",
    icon: CalendarCheck,
  },
  {
    title: "Cancelled Bookings",
    value: "—",
    description: "Cancelled reservations",
    icon: Archive,
  },
];

function BookingHistoryPage() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Customer Portal / Booking History
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Booking History
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review your previous hotel stays and reservation records.
            </p>
          </div>

          <NavLink
            to="/customer/reservations"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-800 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
          >
            My Reservations
            <ArrowRight size={17} />
          </NavLink>
        </div>
      </section>

      {/* Booking history summary */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {historyStats.map((stat) => {
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

      {/* Past bookings */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Clock size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Previous Bookings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your completed and past reservation records.
              </p>
            </div>
          </div>
        </div>

        {/* Table structure */}
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

        {/* Empty state until booking history API is connected */}
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <ClipboardList size={30} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            No Booking History
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your previous stays and completed reservations will appear here
            after you have made and completed a booking.
          </p>

          <NavLink
            to="/customer/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            Explore Rooms
            <ArrowRight size={17} />
          </NavLink>
        </div>
      </section>

      {/* Booking information */}
      <div className="rounded-xl border border-slate-200 bg-slate-100/70 p-4">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-slate-800">Booking records:</span>{" "}
          Your previous booking references, room categories, stay dates and
          reservation statuses will be displayed here when booking history
          becomes available through the backend.
        </p>
      </div>
    </div>
  );
}

export default BookingHistoryPage;
