import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function StaffProfilePage() {
  const { user } = useAuth();

  const roleLabel =
    user?.role === "ADMIN"
      ? "Administrator"
      : user?.role === "RECEPTIONIST"
        ? "Receptionist"
        : "Staff";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Staff console
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-emerald-950">
          My profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          View your account details and update your password.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {user?.fullName ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {user?.email ?? "—"}
            </dd>
          </div>
          {user?.mobile ? (
            <div>
              <dt className="text-slate-500">Mobile</dt>
              <dd className="mt-1 font-medium text-slate-900">{user.mobile}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-slate-500">Role</dt>
            <dd className="mt-1 font-medium text-slate-900">{roleLabel}</dd>
          </div>
        </dl>

        <Link
          to="/staff/change-password"
          className="inline-flex rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          Change password
        </Link>
      </section>
    </div>
  );
}

export default StaffProfilePage;
