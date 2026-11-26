import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-emerald-950">{value}</p>
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{description}</p>
    </article>
  );
}

export default MetricCard;
