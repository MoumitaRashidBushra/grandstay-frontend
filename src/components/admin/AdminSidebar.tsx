import {
  BedDouble,
  CalendarDays,
  ChartNoAxesCombined,
  House,
  LayoutDashboard,
  Settings,
  Tags,
  Users,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

// Admin panel navigation menu items.
const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Reservations", path: "/admin/reservations", icon: CalendarDays },
  { name: "Rooms", path: "/admin/rooms", icon: BedDouble },
  { name: "Categories", path: "/admin/categories", icon: Tags },
  { name: "Staff Management", path: "/admin/staff", icon: Users },
  { name: "Hotel Settings", path: "/admin/settings", icon: Settings },
  { name: "Reports", path: "/admin/reports", icon: ChartNoAxesCombined },
];

function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col overflow-hidden bg-emerald-950 px-5 py-6 text-white">
      {/* Fixed GrandStay branding */}
      <Link to="/" className="mb-6 shrink-0 border-b border-emerald-800 pb-6">
        <h1 className="text-2xl font-bold tracking-wide">GrandStay</h1>
        <p className="mt-1 text-sm text-white">Hotel Booking & Reservation</p>
      </Link>

      {/* Scrollable menu without visible scrollbar */}
      <nav className="sidebar-menu-scroll min-h-0 flex-1 overflow-y-auto py-2">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white">
          Main Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-700 text-white shadow"
                      : "text-emerald-100 hover:bg-emerald-900"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Fixed Back to Home button */}
      <div className="shrink-0 border-t border-emerald-800 pt-5">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900 hover:text-white"
        >
          <House size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
