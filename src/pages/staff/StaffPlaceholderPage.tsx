interface StaffPlaceholderPageProps {
  title: string;
  description: string;
}

function StaffPlaceholderPage({ title, description }: StaffPlaceholderPageProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-3xl font-bold text-emerald-950">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>
      <p className="mt-6 text-sm text-slate-500">
        This screen is part of the staff console. Desk and booking workflows will
        connect here in later tickets.
      </p>
    </section>
  );
}

export default StaffPlaceholderPage;
