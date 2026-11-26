import {
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const summaryCards = [
  {
    label: "Find booking",
    description: "Look up a reservation by guest or reference",
    path: "/staff/find-booking",
    icon: CalendarCheck,
  },
  {
    label: "Today's arrivals",
    description: "Guests expected to check in today",
    path: "/staff/arrivals",
    icon: CheckCircle2,
  },
  {
    label: "Check-in",
    description: "Start check-in for an arriving guest",
    path: "/staff/check-in",
    icon: BedDouble,
  },
  {
    label: "Check-out",
    description: "Complete departure and invoice",
    path: "/staff/check-out",
    icon: Users,
  },
];

function StaffDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-medium text-emerald-700">Staff console</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">
          Welcome{user?.fullName ? `, ${user.fullName}` : ""}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Use the menu for desk tasks. Items your role cannot use are hidden.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.path}
              to={card.path}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon size={22} />
              </div>
              <h2 className="font-semibold text-slate-900">{card.label}</h2>
              <p className="mt-1 text-sm text-slate-500">{card.description}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default StaffDashboardPage;
