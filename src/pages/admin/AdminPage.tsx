import {
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock,
  DoorOpen,
  PieChart,
  RefreshCcw,
  Users,
} from "lucide-react";
import StatCard from "../../components/admin/StatCard";

// SRS-defined room categories and their fixed starting configuration.
const roomCategories = [
  {
    name: "Standard",
    price: "৳2,500",
    capacity: "2 guests",
  },
  {
    name: "Deluxe",
    price: "৳4,000",
    capacity: "3 guests",
  },
  {
    name: "Suite",
    price: "৳7,000",
    capacity: "4 guests",
  },
];

// Format the current date using the hotel's Asia/Dhaka timezone.
const today = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(new Date());

function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Dashboard heading and current date */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">Overview</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">
            Welcome back, Admin
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here is your hotel management overview.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <CalendarDays size={18} className="text-emerald-700" />
          {today}
        </div>
      </section>

      {/* Main hotel performance summary */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-emerald-950">
            Hotel Overview
          </h2>
          <span className="text-xs text-slate-400">
            Live data when connected
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Rooms"
            value="50"
            description="Total hotel room inventory"
            icon={BedDouble}
          />

          <StatCard
            title="Occupied Rooms"
            value="—"
            description="Current occupied room count"
            icon={DoorOpen}
          />

          <StatCard
            title="Available Rooms"
            value="—"
            description="Rooms available for booking"
            icon={CalendarCheck}
          />

          <StatCard
            title="Maintenance"
            value="—"
            description="Rooms temporarily unavailable"
            icon={RefreshCcw}
          />

          <StatCard
            title="Retired Rooms"
            value="—"
            description="Rooms permanently retired"
            icon={BedDouble}
          />
        </div>
      </section>

      {/* Today's front desk activity */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-emerald-950">
          Today's Activity
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Today's Check-ins</p>
                <p className="mt-2 text-3xl font-bold text-emerald-950">—</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
                <ArrowDownRight size={23} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Arrivals scheduled for today
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Today's Check-outs</p>
                <p className="mt-2 text-3xl font-bold text-emerald-950">—</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <ArrowUpRight size={23} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Departures scheduled for today
            </p>
          </div>
        </div>
      </section>

      {/* Booking status summary */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <CalendarClock size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-emerald-950">Booking Overview</h2>
            <p className="text-xs text-slate-500">
              Reservation counts by status
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Confirmed", color: "bg-emerald-500" },
            { label: "Checked-in", color: "bg-blue-500" },
            { label: "Checked-out", color: "bg-slate-400" },
            { label: "Cancelled", color: "bg-red-400" },
          ].map((status) => (
            <div key={status.label} className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${status.color}`} />
                <p className="text-sm text-slate-600">{status.label}</p>
              </div>
              <p className="mt-3 text-2xl font-bold text-emerald-950">—</p>
            </div>
          ))}
        </div>
      </section>

      {/* Financial overview */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-emerald-950">
          Financial Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Revenue"
            value="—"
            description="Daily and monthly payment revenue"
            icon={CircleDollarSign}
          />

          <StatCard
            title="Refunds"
            value="—"
            description="Total refunded payment amount"
            icon={RefreshCcw}
          />

          <StatCard
            title="Net Revenue"
            value="—"
            description="Revenue after refunds"
            icon={ChartNoAxesCombined}
          />
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Financial figures will appear after connecting the reports API.
        </p>
      </section>

      {/* Daily and category-wise occupancy summary */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <PieChart size={22} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-emerald-950">
              Occupancy Summary
            </h2>
            <p className="text-sm text-slate-500">
              Daily and room category-wise occupancy
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Daily occupancy */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-emerald-950">Daily Occupancy</h3>
            <p className="mt-1 text-xs text-slate-500">
              Current hotel occupancy overview
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 px-4 py-8 text-center">
              <ChartNoAxesCombined
                size={30}
                className="mx-auto text-emerald-700"
              />
              <p className="mt-3 text-2xl font-bold text-emerald-950">—%</p>
              <p className="mt-1 text-sm text-slate-500">Occupancy rate</p>
              <p className="mt-3 text-xs text-slate-400">
                Daily occupancy data will appear when the reports API is
                connected.
              </p>
            </div>
          </div>

          {/* Category-wise occupancy */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-emerald-950">
              Category-wise Occupancy
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Occupancy breakdown by room category
            </p>

            <div className="mt-5 space-y-5">
              {roomCategories.map((category) => (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {category.name}
                    </span>
                    <span className="text-sm font-semibold text-emerald-950">
                      —%
                    </span>
                  </div>

                  {/* Empty progress track until real occupancy data is available */}
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-0 rounded-full bg-emerald-600" />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Category occupancy data will appear after connecting the reports
              API.
            </p>
          </div>
        </div>
      </section>

      {/* Room category information from the SRS */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-emerald-950">
            Room Categories
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Current standard category configuration
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {roomCategories.map((category) => (
            <article
              key={category.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-emerald-950">
                  {category.name}
                </h3>
                <BedDouble size={21} className="text-emerald-700" />
              </div>

              <p className="mt-4 text-2xl font-bold text-emerald-950">
                {category.price}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  / night
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Maximum capacity: {category.capacity}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Upcoming reservations placeholder */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <Users size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-emerald-950">
              Upcoming Reservations
            </h2>
            <p className="text-xs text-slate-500">
              Confirmed arrivals for the next 7 days
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
          <Clock size={28} className="mx-auto text-slate-400" />
          <p className="mt-3 text-sm font-medium text-slate-700">
            Reservation data is not connected yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upcoming guest information will appear here when the backend API is
            ready.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
