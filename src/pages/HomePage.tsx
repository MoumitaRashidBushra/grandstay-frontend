import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-stone-50 text-slate-800">
      <header className="border-b border-stone-200 bg-white">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5"
        >
          <Link
            className="font-serif text-2xl font-semibold text-emerald-900"
            to="/"
          >
            GrandStay
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              to="/customer"
            >
              Booking
            </Link>
            <Link
              className="rounded-md bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 sm:px-5"
              to="/customer"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[min(80vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/60 blur-3xl"
        />
        <div className="relative z-10 flex flex-col items-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800 shadow-sm">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-emerald-600"
            />
            Hotel booking, made simple
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Welcome to <span className="text-emerald-900">GrandStay</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            A comfortable place to stay, with a simple way to plan your visit.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-emerald-800 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              to="/customer"
            >
              Get started <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-stone-300 bg-white/80 px-6 text-sm font-semibold text-slate-700 transition hover:border-emerald-800/40 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              to="/staff"
            >
              Staff portal
            </Link>
          </div>

          <div
            aria-label="Available room categories"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-stone-300/80 px-4 pt-6 text-sm font-medium text-slate-600"
          >
            <span>Standard</span>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-amber-600"
            />
            <span>Deluxe</span>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-amber-600"
            />
            <span>Suite</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
