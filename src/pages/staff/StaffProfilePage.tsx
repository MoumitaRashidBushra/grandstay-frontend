import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function StaffProfilePage() {
  const { user } = useAuth();

  return (
    <section className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-3xl font-bold text-emerald-950">Profile</h1>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-slate-500">Name</dt>
          <dd className="font-medium text-slate-900">{user?.fullName}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Email</dt>
          <dd className="font-medium text-slate-900">{user?.email}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Role</dt>
          <dd className="font-medium text-slate-900">{user?.role}</dd>
        </div>
      </dl>
      <Link
        to="/change-password"
        className="inline-flex rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
      >
        Change password
      </Link>
    </section>
  );
}

export default StaffProfilePage;
