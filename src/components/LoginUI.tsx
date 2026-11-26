import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import type { FormEventHandler } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import heroImage from "../assets/grandstay-sunset-resort.png";
import type { LoginCredentials } from "../types/auth";

interface LoginUIProps {
  errorMessage: string | null;
  errors: FieldErrors<LoginCredentials>;
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<LoginCredentials>;
}

function LoginUI({
  errorMessage,
  errors,
  isPending,
  onSubmit,
  register,
}: LoginUIProps) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-emerald-950 px-4 py-10 text-slate-900">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
        src={heroImage}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-emerald-950/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-emerald-950/15 via-transparent to-black/25"
      />

      <section className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Login to your account</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                id="email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                placeholder="Enter your email"
                className="login-field w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-rose-600" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                id="password"
                type="password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
                placeholder="Enter your password"
                className="login-field w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-rose-600" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Login"}
            {!isPending && <ArrowRight aria-hidden="true" size={18} />}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
          <Link
            className="mb-3 block text-sm font-medium text-emerald-800 hover:text-emerald-950"
            to="/register"
          >
            Create a customer account
          </Link>
          <Link
            className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-800"
            to="/"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginUI;
