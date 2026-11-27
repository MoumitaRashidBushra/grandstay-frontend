import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  House,
  KeyRound,
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

// Define the navigation item structure.
// The end property is optional because only some links need exact matching.
interface StaffMenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

interface StaffSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function StaffSidebar({ isOpen, onClose }: StaffSidebarProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  // Shared operational pages available to Admin and Receptionist.
  const operationalItems: StaffMenuItem[] = [
    { name: "Find Booking", path: "/staff/find-booking", icon: Search },
    { name: "Arrivals", path: "/staff/arrivals", icon: CalendarDays },
    { name: "Departures", path: "/staff/departures", icon: ClipboardList },
    { name: "Check-in", path: "/staff/check-in", icon: LogIn },
    { name: "Check-out", path: "/staff/check-out", icon: LogOut },
    { name: "Invoices", path: "/staff/invoices", icon: FileText },
    { name: "My profile", path: "/staff/profile", icon: UserRound },
  ];

  // Management pages are visible only to Admin.
  const adminItems: StaffMenuItem[] = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Reservations", path: "/admin/reservations", icon: CalendarDays },
    { name: "Rooms", path: "/admin/rooms", icon: BedDouble },
    { name: "Categories & Prices", path: "/admin/categories", icon: Tags },
    { name: "Accounts", path: "/admin/staff", icon: Users },
    { name: "Hotel Settings", path: "/admin/settings", icon: Settings },
    { name: "Maintenance", path: "/admin/maintenance", icon: Wrench },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: ChartNoAxesCombined,
    },
  ];

  // Display different navigation menus according to the user's role.
  const menuItems: StaffMenuItem[] = isAdmin
    ? [...adminItems, ...operationalItems]
    : [
        {
          name: "Front Desk",
          path: "/staff",
          icon: LayoutDashboard,
          end: true,
        },
        ...operationalItems,
      ];

  return (
    <aside
      aria-label={isAdmin ? "Admin navigation" : "Receptionist navigation"}
      className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 flex-col overflow-hidden bg-emerald-950 px-5 py-6 text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* GrandStay branding */}
      <Link
        to="/"
        onClick={onClose}
        className="mb-6 shrink-0 border-b border-emerald-800 pb-6"
      >
        <h1 className="font-serif text-2xl font-bold tracking-wide">
          GrandStay
        </h1>

        <p className="mt-1 text-xs text-emerald-200">
          Hotel Booking & Reservation
        </p>

        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          {isAdmin ? "Administration Portal" : "Front Desk Portal"}
        </p>
      </Link>

      {/* Role-based navigation */}
      <nav className="sidebar-menu-scroll min-h-0 flex-1 overflow-y-auto py-2">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-emerald-200">
          {isAdmin ? "Management & Operations" : "Staff Operations"}
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-700 text-white shadow"
                      : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Change Password is available to both staff roles. */}
          <NavLink
            to="/staff/change-password"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-700 text-white shadow"
                  : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
              }`
            }
          >
            <KeyRound size={20} />
            <span>Change Password</span>
          </NavLink>
        </div>
      </nav>

      {/* Back to Home */}
      <div className="shrink-0 border-t border-emerald-800 pt-5">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900 hover:text-white"
        >
          <House size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}

export default StaffSidebar;
