import { Bell, LogOut, UserRound } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  const roleLabel =
    user?.role === "RECEPTIONIST"
      ? "Receptionist"
      : user?.role === "ADMIN"
        ? "Administrator"
        : "Staff";

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="ml-72 flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-8 py-4 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              GrandStay Staff Console
            </h2>
            <p className="text-sm text-slate-500">
              Menu items follow your role
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={21} />
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <UserRound size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {user?.fullName ?? "Staff member"}
                </p>
                <p className="text-xs text-slate-500">{roleLabel}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
