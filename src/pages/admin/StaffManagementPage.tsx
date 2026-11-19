import {
  Building2,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

// Available staff roles in the GrandStay system.
const staffRoles = ["ADMIN", "RECEPTIONIST"];

// Staff overview card information.
const overviewCards = [
  {
    label: "Total Staff",
    value: "—",
    icon: Users,
    iconColor: "text-emerald-700",
    iconBackground: "bg-emerald-50",
  },
  {
    label: "Administrators",
    value: "—",
    icon: ShieldCheck,
    iconColor: "text-violet-700",
    iconBackground: "bg-violet-50",
  },
  {
    label: "Receptionists",
    value: "—",
    icon: UserRound,
    iconColor: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
  {
    label: "Active Accounts",
    value: "—",
    icon: UserCheck,
    iconColor: "text-amber-700",
    iconBackground: "bg-amber-50",
  },
];

function StaffManagementPage() {
  // Store staff search and filter values.
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  // Reset all filter values.
  const clearFilters = () => {
    setSearch("");
    setRole("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Hotel Management
          </p>

          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">
            Staff Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your hotel team, staff roles, and account information.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Staff creation will be available after API integration"
          className="flex cursor-not-allowed items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-500 opacity-75 shadow-sm sm:self-auto"
        >
          <Plus size={18} className="text-emerald-700" />
          Add Staff Member
        </button>
      </section>

      {/* Staff overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>

                <div className={`rounded-xl p-2.5 ${item.iconBackground}`}>
                  <Icon size={20} className={item.iconColor} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-bold text-emerald-950">
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Staff directory heading */}
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-emerald-950">Your Team</h2>

          <p className="mt-1 text-xs text-slate-500">
            View and manage staff members across your hotel.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2">
          <Building2 size={17} className="text-emerald-700" />

          <span className="text-xs font-medium text-slate-600">
            GrandStay Hotel
          </span>
        </div>
      </section>

      {/* Staff filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
              <Filter size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-emerald-950">Filter Staff</h2>

              <p className="text-xs text-slate-500">
                Find team members using different criteria.
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

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Search staff */}
          <div>
            <label
              htmlFor="staff-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search Staff
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />

              <input
                id="staff-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Filter by role */}
          <div>
            <label
              htmlFor="staff-role"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Staff Role
            </label>

            <select
              id="staff-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Roles</option>

              {staffRoles.map((item) => (
                <option key={item} value={item}>
                  {item.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Staff directory table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="font-semibold text-emerald-950">Staff Directory</h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage staff profiles and access information.
            </p>
          </div>

          <span className="flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            <Users size={14} />
            Team Members
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Staff Member</th>
                <th className="px-5 py-4 font-semibold">Email Address</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Account Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-50">
                    <UserCog size={27} className="text-slate-300" />
                  </div>

                  <p className="mt-4 font-medium text-slate-700">
                    No staff members available
                  </p>

                  <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                    Staff information will appear here when the backend API is
                    connected.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3">
          <p className="text-xs text-slate-400">
            Staff information will be updated through the backend API.
          </p>
        </div>
      </section>

      {/* Staff management information */}
      <section className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-950">
            Staff Access Management
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Staff permissions are managed according to their assigned system
            roles. Only authorized administrators should manage staff access.
          </p>
        </div>
      </section>
    </div>
  );
}

export default StaffManagementPage;
