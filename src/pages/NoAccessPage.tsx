import { ArrowLeft, House, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

function NoAccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-950/5 sm:p-10">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <ShieldX size={38} strokeWidth={1.7} />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
          GrandStay Security
        </p>

        <h1 className="font-serif text-3xl font-semibold text-emerald-950">
          Access Denied
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Sorry, you don't have permission to access this page. Please contact
          an administrator if you believe this is a mistake.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        >
          <House size={17} />
          Back to Home
        </Link>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Sign in with another account
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NoAccessPage;
