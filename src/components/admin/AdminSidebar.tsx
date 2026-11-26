import {
  BedDouble,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  Search,
  Settings,
  Tags,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/auth";

interface MenuItem {
  name: string;
  path: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
  roles: UserRole[];
}

// One staff-console menu. Items a role cannot use are omitted, not disabled.
const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/staff",
    icon: LayoutDashboard,
    end: true,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Find booking",
    path: "/staff/find-booking",
    icon: Search,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Today's arrivals",
    path: "/staff/arrivals",
    icon: CalendarCheck,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Check-in",
    path: "/staff/check-in",
    icon: LogIn,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Check-out",
    path: "/staff/check-out",
    icon: LogOut,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Reprint invoice",
    path: "/staff/invoices/reprint",
    icon: FileText,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Availability",
    path: "/staff/availability",
    icon: ClipboardList,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
  {
    name: "Reservations",
    path: "/staff/reservations",
    icon: CalendarDays,
    roles: ["ADMIN"],
  },
  {
    name: "Rooms",
    path: "/staff/rooms",
    icon: BedDouble,
    roles: ["ADMIN"],
  },
  {
    name: "Maintenance",
    path: "/staff/maintenance",
    icon: Wrench,
    roles: ["ADMIN"],
  },
  {
    name: "Categories",
    path: "/staff/categories",
    icon: Tags,
    roles: ["ADMIN"],
  },
  {
    name: "Accounts",
    path: "/staff/accounts",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    name: "Hotel Settings",
    path: "/staff/settings",
    icon: Settings,
    roles: ["ADMIN"],
  },
  {
    name: "Reports",
    path: "/staff/reports",
    icon: ChartNoAxesCombined,
    roles: ["ADMIN"],
  },
  {
    name: "Profile",
    path: "/staff/profile",
    icon: UserRound,
    roles: ["ADMIN", "RECEPTIONIST"],
  },
];

function AdminSidebar() {
  const { user } = useAuth();
  const role = user?.role;
  const visibleItems = menuItems.filter(
    (item) => role !== undefined && item.roles.includes(role),
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col overflow-hidden bg-emerald-950 px-5 py-6 text-white">
      <Link to="/" className="mb-6 shrink-0 border-b border-emerald-800 pb-6">
        <h1 className="text-2xl font-bold tracking-wide">GrandStay</h1>
        <p className="mt-1 text-sm text-white">Staff console</p>
      </Link>

      <nav className="sidebar-menu-scroll min-h-0 flex-1 overflow-y-auto py-2">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white">
          Main Menu
        </p>

        <div className="space-y-2">
          {visibleItems.map((item) => {
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
