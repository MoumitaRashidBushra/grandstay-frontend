import { X } from "lucide-react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface FilterPanelProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClear: () => void;
  children: ReactNode;
}

function FilterPanel({
  title,
  description,
  icon: Icon,
  onClear,
  children,
}: FilterPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <Icon size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-emerald-950">{title}</h2>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:self-auto"
        >
          <X size={16} />
          Clear Filters
        </button>
      </div>

      {children}
    </section>
  );
}

export default FilterPanel;
