import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const { user, markPasswordChanged } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await api.post("/me/password", { currentPassword, newPassword });
      markPasswordChanged();
      const destination =
        user?.role === "ADMIN"
          ? "/admin"
          : user?.role === "RECEPTIONIST"
            ? "/staff"
            : "/customer";
      navigate(destination, { replace: true });
    } catch {
      setErrorMessage("Check your current password and try a new one.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={submit}
      >
        <h1 className="font-serif text-3xl font-semibold text-emerald-950">
          Set a new password
        </h1>
        <p className="text-sm text-slate-600">
          Your temporary password must be changed before you continue.
        </p>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="current-password"
        >
          Current password
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
            required
          />
        </label>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="new-password"
        >
          New password
          <input
            id="new-password"
            type="password"
            value={newPassword}
            minLength={8}
            onChange={(event) => setNewPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
            required
          />
        </label>
        {errorMessage ? (
          <p role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save password"}
        </button>
      </form>
    </main>
  );
}

export default ChangePasswordPage;
