import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Building2,
  CheckCircle2,
  Filter,
  Search,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import FilterPanel from "../../components/FilterPanel";
import PageHeader from "../../components/PageHeader";

// Available room statuses.
const roomStatuses = ["OCCUPIED", "AVAILABLE", "MAINTENANCE", "RETIRED"];

// Available room categories from the SRS.
const roomCategories = ["STANDARD", "DELUXE", "SUITE"];

// Room summary card information.
const roomSummaryCards: {
  label: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    label: "Total Rooms",
    icon: Building2,
    color: "bg-emerald-500",
  },
  {
    label: "Occupied Rooms",
    icon: BedDouble,
    color: "bg-blue-500",
  },
  {
    label: "Available Rooms",
    icon: CheckCircle2,
    color: "bg-emerald-500",
  },
  {
    label: "Maintenance",
    icon: Wrench,
    color: "bg-amber-500",
  },
];

function RoomsPage() {
  // Store room filter values.
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  // Reset all filter values.
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setCategory("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        eyebrow="Hotel Management"
        title="Room Management"
        description="Manage hotel rooms, monitor availability, and track room conditions."
        action={
          <button
            type="button"
            disabled
            title="Room creation will be available after API integration"
            className="flex cursor-not-allowed items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-500 opacity-75 shadow-sm sm:self-auto"
          >
            <BedDouble size={18} className="text-emerald-700" />
            Add New Room
          </button>
        }
      />

      {/* Room summary cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-emerald-950">
            Room Overview
          </h2>

          <span className="text-xs text-slate-400">
            Live data when connected
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roomSummaryCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${item.color}`} />
                  <p className="text-sm text-slate-500">{item.label}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-3xl font-bold text-emerald-950">—</p>

                  <Icon size={21} className="text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Room filters */}
      <FilterPanel
        title="Filter Rooms"
        description="Find rooms using different criteria."
        icon={Filter}
        onClear={clearFilters}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Search field */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label
              htmlFor="room-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search Room
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />

              <input
                id="room-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by room number..."
                className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Room status */}
          <div>
            <label
              htmlFor="room-status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Room Status
            </label>

            <select
              id="room-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Statuses</option>

              {roomStatuses.map((item) => (
                <option key={item} value={item}>
                  {item.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Room category */}
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
      </FilterPanel>

      {/* Room inventory table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="font-semibold text-emerald-950">Room Inventory</h2>

          <p className="mt-1 text-xs text-slate-500">
            View and manage all hotel rooms.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Room Number</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Capacity</th>
                <th className="px-5 py-4 font-semibold">Room Status</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <BedDouble size={32} className="mx-auto text-slate-300" />

                  <p className="mt-3 font-medium text-slate-700">
                    No room data available
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Room information will appear here when the backend API is
                    connected.
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

export default RoomsPage;
