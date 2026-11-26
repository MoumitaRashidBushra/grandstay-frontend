import { ClipboardList } from "lucide-react";

interface StaffOperationPageProps {
  title: string;
  description: string;
}

function StaffOperationPage({ title, description }: StaffOperationPageProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page heading */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Staff Operations
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </section>

      {/* Temporary content until the backend API is ready */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ClipboardList size={26} />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-800">
          {title} workspace
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
          This page is being prepared. Booking and hotel data will appear here
          after the backend API integration is completed.
        </p>
      </section>
    </div>
  );
}

export default StaffOperationPage;
