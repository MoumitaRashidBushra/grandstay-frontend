import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
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
} from "lucide-react";
import { useEffect, useState } from "react";
import StaffAccountDialog from "../../components/admin/StaffAccountDialog";
import { useAuth } from "../../hooks/useAuth";
import {
  createStaff,
  listCustomers,
  listStaff,
  resetAccountPassword,
  updateCustomer,
  updateStaff,
  type CreateStaffInput,
  type StaffAccount,
  type UpdateStaffInput,
} from "../../services/staffService";

const staffRoles = ["ADMIN", "RECEPTIONIST"] as const;

type DialogState =
  { mode: "create" } | { mode: "edit"; account: StaffAccount } | null;

function StaffManagementPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [directory, setDirectory] = useState<"staff" | "customers">("staff");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      300,
    );

    return () => window.clearTimeout(timer);
  }, [search]);

  const staffQuery = useQuery({
    queryKey: ["admin-staff", debouncedSearch, role],
    queryFn: () =>
      listStaff({
        search: debouncedSearch,
        role: role === "ADMIN" || role === "RECEPTIONIST" ? role : "",
      }),
    enabled: directory === "staff",
    placeholderData: keepPreviousData,
  });

  const customerQuery = useQuery({
    queryKey: ["admin-customers", debouncedSearch],
    queryFn: () => listCustomers({ search: debouncedSearch }),
    enabled: directory === "customers",
    placeholderData: keepPreviousData,
  });

  const refreshStaff = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
    await queryClient.invalidateQueries({ queryKey: ["admin-customers"] });
  };

  const createMutation = useMutation({
    mutationFn: (input: CreateStaffInput) => createStaff(input),
    onSuccess: async () => {
      await refreshStaff();
      setDialog(null);
      setFormError(null);
    },
    onError: (error: unknown) => {
      setFormError(apiErrorMessage(error, "Could not create this account."));
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (variables: {
      id: string;
      input: UpdateStaffInput & { password?: string };
      accountKind: "staff" | "customers";
    }) => {
      const { password, ...profile } = variables.input;
      const updated =
        variables.accountKind === "staff"
          ? await updateStaff(variables.id, profile)
          : await updateCustomer(variables.id, profile);

      if (password) {
        await resetAccountPassword(
          variables.accountKind,
          variables.id,
          password,
        );
      }

      return updated;
    },
    onSuccess: async () => {
      await refreshStaff();
      setDialog(null);
      setFormError(null);
      setPendingId(null);
    },
    onError: (error: unknown) => {
      setFormError(apiErrorMessage(error, "Could not update this account."));
      setPendingId(null);
    },
  });

  const summary = staffQuery.data?.summary;
  const customerSummary = customerQuery.data?.summary;
  const overviewCards =
    directory === "customers"
      ? [
          {
            label: "Total Customers",
            value: customerSummary ? String(customerSummary.total) : "—",
            icon: Users,
            iconColor: "text-emerald-700",
            iconBackground: "bg-emerald-50",
          },
          {
            label: "Active Accounts",
            value: customerSummary ? String(customerSummary.active) : "—",
            icon: UserCheck,
            iconColor: "text-amber-700",
            iconBackground: "bg-amber-50",
          },
        ]
      : [
    {
      label: "Total Staff",
      value: summary ? String(summary.total) : "—",
      icon: Users,
      iconColor: "text-emerald-700",
      iconBackground: "bg-emerald-50",
    },
    {
      label: "Administrators",
      value: summary ? String(summary.admins) : "—",
      icon: ShieldCheck,
      iconColor: "text-violet-700",
      iconBackground: "bg-violet-50",
    },
    {
      label: "Receptionists",
      value: summary ? String(summary.receptionists) : "—",
      icon: UserRound,
      iconColor: "text-blue-700",
      iconBackground: "bg-blue-50",
    },
    {
      label: "Active Accounts",
      value: summary ? String(summary.active) : "—",
      icon: UserCheck,
      iconColor: "text-amber-700",
      iconBackground: "bg-amber-50",
    },
  ];

  const clearFilters = () => {
    setSearch("");
    setRole("");
  };

  const changeStatus = (account: StaffAccount) => {
    setFormError(null);
    setPendingId(account.id);
    updateMutation.mutate({
      id: account.id,
      accountKind: directory,
      input: { isActive: !account.isActive },
    });
  };

  const activeQuery = directory === "staff" ? staffQuery : customerQuery;
  const staff =
    directory === "staff"
      ? (staffQuery.data?.staff ?? [])
      : (customerQuery.data?.customers ?? []);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Hotel Management
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">
            Accounts
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create receptionist accounts, and activate or deactivate staff and
            customers.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setDirectory("staff")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                directory === "staff"
                  ? "bg-emerald-700 text-white"
                  : "border border-slate-200 text-slate-600"
              }`}
            >
              Staff
            </button>
            <button
              type="button"
              onClick={() => setDirectory("customers")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                directory === "customers"
                  ? "bg-emerald-700 text-white"
                  : "border border-slate-200 text-slate-600"
              }`}
            >
              Customers
            </button>
          </div>
        </div>

        {directory === "staff" ? (
          <button
            type="button"
            onClick={() => {
              setFormError(null);
              setDialog({ mode: "create" });
            }}
            className="flex items-center gap-2 self-start rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 sm:self-auto"
          >
            <Plus size={18} />
            Add Receptionist
          </button>
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
              <Filter size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-emerald-950">
                {directory === "staff" ? "Filter Staff" : "Filter Customers"}
              </h2>
              <p className="text-xs text-slate-500">
                Find accounts by name or email.
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
          <div>
            <label
              htmlFor="staff-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              {directory === "staff" ? "Search Staff" : "Search customers"}
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
          {directory === "staff" ? (
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
                    {item === "ADMIN" ? "Admin" : "Receptionist"}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </FilterPanel>

      {activeQuery.isError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {apiErrorMessage(
            activeQuery.error,
            "Could not load accounts.",
          )}
        </p>
      ) : null}

      {formError && !dialog ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {formError}
        </p>
      ) : null}

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
            {staff.length} shown
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-left text-sm">
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
              {activeQuery.isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-16 text-center text-sm text-slate-500"
                  >
                    Loading staff accounts...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-50">
                      <UserCog size={27} className="text-slate-300" />
                    </div>
                    <p className="mt-4 font-medium text-slate-700">
                      No staff members found
                    </p>
                    <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                      Try another search, or add a staff member.
                    </p>
                  </td>
                </tr>
              ) : (
                staff.map((member) => {
                  const isSelf = member.id === user?.id;

                  return (
                    <tr key={member.id} className="border-t border-slate-100">
                      <td className="px-5 py-4">
                        <p className="font-medium text-emerald-950">
                          {member.fullName}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {member.mobile ?? "No mobile"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {member.email}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            member.role === "ADMIN"
                              ? "bg-violet-50 text-violet-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {member.role === "ADMIN"
                            ? "Admin"
                            : member.role === "CUSTOMER"
                              ? "Customer"
                              : "Receptionist"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            member.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {member.isActive ? "Active" : "Inactive"}
                        </span>
                        {member.mustResetPw ? (
                          <p className="mt-1 text-xs text-amber-700">
                            Password reset required
                          </p>
                        ) : null}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFormError(null);
                              setDialog({ mode: "edit", account: member });
                            }}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={isSelf || pendingId === member.id}
                            title={
                              isSelf
                                ? "You cannot change your own account status"
                                : undefined
                            }
                            onClick={() => changeStatus(member)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {member.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {dialog ? (
        <StaffAccountDialog
          key={dialog.mode === "edit" ? dialog.account.id : "create"}
          mode={dialog.mode}
          account={dialog.mode === "edit" ? dialog.account : undefined}
          currentUserId={user?.id}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          errorMessage={formError}
          onClose={() => {
            if (!createMutation.isPending && !updateMutation.isPending) {
              setDialog(null);
              setFormError(null);
            }
          }}
          onCreate={(input) => {
            setFormError(null);
            createMutation.mutate(input);
          }}
          onUpdate={(input) => {
            if (dialog.mode !== "edit") {
              return;
            }

            setFormError(null);
            updateMutation.mutate({
              id: dialog.account.id,
              accountKind: directory,
              input,
            });
          }}
        />
      ) : null}
    </div>
  );
}

function apiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const message = error.response?.data?.message;

  if (Array.isArray(message)) {
    return message.join(" ");
  }

  if (typeof message === "string") {
    return message;
  }

  if (error.response?.status === 403) {
    return "You do not have permission to manage this account.";
  }

  return fallback;
}

export default StaffManagementPage;
