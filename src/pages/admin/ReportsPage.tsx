import {
  BarChart3,
  BedDouble,
  CalendarDays,
  Download,
  Filter,
  Percent,
  RefreshCcw,
  Search,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

// Report filters.
const bookingStatuses = ["CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"];

const roomCategories = ["STANDARD", "DELUXE", "SUITE"];

// Report summary card information.
const summaryCards = [
  {
    label: "Total Bookings",
    value: "—",
    description: "Reservations across all statuses",
    icon: CalendarDays,
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  {
    label: "Occupancy Rate",
    value: "—",
    description: "Current room occupancy",
    icon: Percent,
    color: "text-blue-700",
    background: "bg-blue-50",
  },
  {
    label: "Total Revenue",
    value: "—",
    description: "Revenue from bookings",
    icon: Wallet,
    color: "text-violet-700",
    background: "bg-violet-50",
  },
  {
    label: "Net Revenue",
    value: "—",
    description: "After refunds",
    icon: TrendingUp,
    color: "text-amber-700",
    background: "bg-amber-50",
  },
];

// Room status report categories from the SRS.
const roomStatusItems = [
  {
    label: "Occupied",
    color: "bg-blue-500",
    description: "Rooms currently occupied",
  },
  {
    label: "Available",
    color: "bg-emerald-500",
    description: "Rooms ready for booking",
  },
  {
    label: "Maintenance",
    color: "bg-amber-500",
    description: "Rooms under maintenance",
  },
  {
    label: "Retired",
    color: "bg-slate-400",
    description: "Rooms removed from inventory",
  },
];

// Booking status report categories.
const bookingStatusItems = [
  {
    label: "Confirmed",
    color: "bg-emerald-500",
  },
  {
    label: "Checked-in",
    color: "bg-blue-500",
  },
  {
    label: "Checked-out",
    color: "bg-violet-500",
  },
  {
    label: "Cancelled",
    color: "bg-rose-500",
  },
];

function ReportsPage() {
  // Store report filter values.
  const [search, setSearch] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  // Reset all filters.
  const clearFilters = () => {
    setSearch("");
    setBookingDate("");
    setCheckInDate("");
    setCheckOutDate("");
    setStatus("");
    setCategory("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Hotel Analytics
          </p>

          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor hotel performance, reservations, revenue, and occupancy.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Report export will be available after API integration"
          className="flex cursor-not-allowed items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-500 opacity-75 shadow-sm sm:self-auto"
        >
          <Download size={17} className="text-emerald-700" />
          Export Report
        </button>
      </section>

      {/* Report summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>

                <div className={`rounded-xl p-2.5 ${item.background}`}>
                  <Icon size={20} className={item.color} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-bold text-emerald-950">
                {item.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">{item.description}</p>
            </div>
          );
        })}
      </section>

      {/* Report filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
              <Filter size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-emerald-950">Report Filters</h2>

              <p className="text-xs text-slate-500">
                Narrow down reports using reservation details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:self-auto"
          >
            <X size={16} />
            Clear Filters
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Booking reference search */}
          <div>
            <label
              htmlFor="report-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Booking Reference
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />

              <input
                id="report-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search booking reference..."
                className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Booking date */}
          <div>
            <label
              htmlFor="booking-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Booking Date
            </label>

            <input
              id="booking-date"
              type="date"
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Check-in date */}
          <div>
            <label
              htmlFor="checkin-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Check-in Date
            </label>

            <input
              id="checkin-date"
              type="date"
              value={checkInDate}
              onChange={(event) => setCheckInDate(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Check-out date */}
          <div>
            <label
              htmlFor="checkout-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Check-out Date
            </label>

            <input
              id="checkout-date"
              type="date"
              value={checkOutDate}
              onChange={(event) => setCheckOutDate(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Booking status */}
          <div>
            <label
              htmlFor="report-status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Booking Status
            </label>

            <select
              id="report-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Statuses</option>

              {bookingStatuses.map((item) => (
                <option key={item} value={item}>
                  {item.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Room category */}
          <div>
            <label
              htmlFor="report-category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Room Category
            </label>

            <select
              id="report-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Categories</option>

              {roomCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Room status report */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <BedDouble size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-emerald-950">
                Room Status Report
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Overview of hotel room conditions.
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-400">FR-RPT-01</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {roomStatusItems.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${item.color}`} />
                <p className="text-sm font-medium text-slate-700">
                  {item.label}
                </p>
              </div>

              <p className="mt-4 text-2xl font-bold text-emerald-950">—</p>

              <p className="mt-1 text-xs text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking status report */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
              <CalendarDays size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-emerald-950">
                Booking Status Summary
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Reservation distribution by status.
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-400">FR-RPT-03</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {bookingStatusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${item.color}`} />
                <span className="text-sm text-slate-600">{item.label}</span>
              </div>

              <span className="text-xl font-bold text-emerald-950">—</span>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue report */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
              <Wallet size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-emerald-950">
                Revenue Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Monitor booking revenue and refunds.
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-400">FR-RPT-04</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm text-slate-500">Total Revenue</p>
            <p className="mt-3 text-2xl font-bold text-emerald-950">—</p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm text-slate-500">Total Refunds</p>
            <p className="mt-3 text-2xl font-bold text-rose-700">—</p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm text-slate-500">Net Revenue</p>
            <p className="mt-3 text-2xl font-bold text-emerald-700">—</p>
          </div>
        </div>
      </section>

      {/* Occupancy report */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <BarChart3 size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-emerald-950">
                Occupancy Analytics
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Daily and category-wise room occupancy.
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-400">FR-RPT-06</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-center">
            <BarChart3 size={30} className="text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              Daily Occupancy
            </p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
              Daily occupancy chart will appear when report data is available.
            </p>
          </div>

          <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-center">
            <Users size={30} className="text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              Category-wise Occupancy
            </p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
              Room category occupancy breakdown will appear after API
              integration.
            </p>
          </div>
        </div>
      </section>

      {/* Report information */}
      <section className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
          <RefreshCcw size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-950">
            Report Data Information
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Report values, analytics, and exports will be populated using
            backend reporting APIs. Filters currently maintain local UI state
            and do not query database records.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ReportsPage;
