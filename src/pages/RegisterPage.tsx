import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await api.post("/auth/register", { fullName, email, mobile, password });
      navigate("/login", { replace: true });
    } catch {
      setErrorMessage(
        "Could not create the account. Check the details and try again.",
      );
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
          Create your account
        </h1>
        <p className="text-sm text-slate-600">
          Registration creates a customer account.
        </p>
        <TextField
          id="register-name"
          label="Full name"
          value={fullName}
          onChange={setFullName}
        />
        <TextField
          id="register-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextField
          id="register-mobile"
          label="Mobile"
          value={mobile}
          onChange={setMobile}
          placeholder="01711000001"
        />
        <TextField
          id="register-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
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
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
        <Link
          className="block text-center text-sm text-emerald-800"
          to="/login"
        >
          Back to login
        </Link>
      </form>
    </main>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
        required
        minLength={type === "password" ? 8 : undefined}
      />
    </label>
  );
}

export default RegisterPage;
