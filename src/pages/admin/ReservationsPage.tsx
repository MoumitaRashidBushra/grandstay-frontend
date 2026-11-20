import { CalendarDays, Filter, Search, X } from "lucide-react";
import { useState } from "react";

// Available reservation statuses.
const reservationStatuses = [
  "CONFIRMED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
];

// Available room categories from the SRS.
const roomCategories = ["STANDARD", "DELUXE", "SUITE"];

function ReservationsPage() {
  // Store reservation filter values.
  const [search, setSearch] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  // Reset all filter values.
  const clearFilters = () => {
    setSearch("");
    setBookingDate("");
    setCheckInDate("");
    setCheckOutDate("");
    setStatus("");
    setCategory("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Hotel Management
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">
            Reservations
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor hotel guest reservations.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <CalendarDays size={18} className="text-emerald-700" />
          Reservation Management
        </div>
      </section>

      {/* Reservation summary cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-emerald-950">
            Reservation Overview
          </h2>
          <span className="text-xs text-slate-400">
            Live data when connected
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Reservations", color: "bg-emerald-500" },
            { label: "Confirmed", color: "bg-blue-500" },
            { label: "Checked-in", color: "bg-amber-500" },
            { label: "Cancelled", color: "bg-red-400" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${item.color}`} />
                <p className="text-sm text-slate-500">{item.label}</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-emerald-950">—</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
              <Filter size={21} />
            </div>
            <div>
              <h2 className="font-semibold text-emerald-950">
                Filter Reservations
              </h2>
              <p className="text-xs text-slate-500">
                Find reservations using different criteria.
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

        <div className="space-y-5">
          {/* Search field */}
          <div>
            <label
              htmlFor="reservation-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search Reservation
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />
              <input
                id="reservation-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by booking reference or guest name..."
                className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Date filters */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="check-in-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Check-in Date
              </label>
              <input
                id="check-in-date"
                type="date"
                value={checkInDate}
                onChange={(event) => setCheckInDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="check-out-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Check-out Date
              </label>
              <input
                id="check-out-date"
                type="date"
                value={checkOutDate}
                onChange={(event) => setCheckOutDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Status and category filters */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="reservation-status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reservation Status
              </label>
              <select
                id="reservation-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">All Statuses</option>
                {reservationStatuses.map((item) => (
                  <option key={item} value={item}>
                    {item.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="room-category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Room Category
              </label>
              <select
                id="room-category"
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
        </div>
      </section>

      {/* Reservation table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="font-semibold text-emerald-950">Reservation List</h2>
          <p className="mt-1 text-xs text-slate-500">
            View and manage all hotel reservations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Booking Ref</th>
                <th className="px-5 py-4 font-semibold">Guest</th>
                <th className="px-5 py-4 font-semibold">Room</th>
                <th className="px-5 py-4 font-semibold">Check-in</th>
                <th className="px-5 py-4 font-semibold">Check-out</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <CalendarDays size={32} className="mx-auto text-slate-300" />
                  <p className="mt-3 font-medium text-slate-700">
                    No reservation data available
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Reservation information will appear here when the backend
                    API is connected.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ReservationsPage;
