import { useState, type FormEvent } from "react";
import { z } from "zod";
import type {
  CreateStaffInput,
  StaffAccount,
  UpdateStaffInput,
} from "../../services/staffService";

const mobilePattern = /^01[3-9]\d{8}$/;

const detailsSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(254),
  mobile: z
    .string()
    .regex(
      mobilePattern,
      "Enter an 11-digit mobile number, such as 01711000001",
    ),
});

const createSchema = detailsSchema.extend({
  password: z
    .string()
    .min(8, "Temporary password must be at least 8 characters")
    .max(72),
});

interface StaffFormValues {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  isActive: boolean;
}

interface StaffAccountDialogProps {
  mode: "create" | "edit";
  account?: StaffAccount;
  currentUserId?: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onCreate: (input: CreateStaffInput) => void;
  onUpdate: (input: UpdateStaffInput & { password?: string }) => void;
}

function StaffAccountDialog({
  mode,
  account,
  currentUserId,
  isSubmitting,
  errorMessage,
  onClose,
  onCreate,
  onUpdate,
}: StaffAccountDialogProps) {
  const isSelf = account?.id === currentUserId;
  const [values, setValues] = useState<StaffFormValues>({
    fullName: account?.fullName ?? "",
    email: account?.email ?? "",
    mobile: account?.mobile ?? "",
    password: "",
    isActive: account?.isActive ?? true,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateField = (
    field: keyof StaffFormValues,
    value: string | boolean,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    if (mode === "create") {
      const parsed = createSchema.safeParse(values);

      if (!parsed.success) {
        setFieldErrors(flattenErrors(parsed.error));
        return;
      }

      onCreate({
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        mobile: parsed.data.mobile,
        password: parsed.data.password,
      });
      return;
    }

    const parsed = detailsSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(flattenErrors(parsed.error));
      return;
    }

    if (values.password && values.password.length < 8) {
      setFieldErrors({
        password: "Temporary password must be at least 8 characters",
      });
      return;
    }

    const input: UpdateStaffInput & { password?: string } = {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      mobile: parsed.data.mobile,
    };

    if (!isSelf) {
      input.isActive = values.isActive;
    }

    if (values.password.trim()) {
      input.password = values.password;
    }

    onUpdate(input);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-emerald-950/40 px-4 py-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-dialog-title"
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="staff-dialog-title"
          className="text-xl font-semibold text-emerald-950"
        >
          {mode === "create" ? "Add staff member" : "Edit staff account"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {mode === "create"
            ? "Create a receptionist account. Hand over the temporary password in person."
            : "Update this account or whether it can sign in."}
        </p>

        <form className="mt-5 space-y-4" onSubmit={submit}>
          <Field
            id="staff-full-name"
            label="Full name"
            value={values.fullName}
            error={fieldErrors.fullName}
            onChange={(value) => updateField("fullName", value)}
          />
          <Field
            id="staff-email"
            label="Email"
            type="email"
            value={values.email}
            error={fieldErrors.email}
            onChange={(value) => updateField("email", value)}
          />
          <Field
            id="staff-mobile"
            label="Mobile"
            value={values.mobile}
            error={fieldErrors.mobile}
            onChange={(value) => updateField("mobile", value)}
            placeholder="01711000001"
          />

          <p className="text-sm text-slate-600">
            {mode === "create"
              ? "This account is created as a receptionist. The administrator account comes from the hotel setup."
              : `Role: ${account?.role === "ADMIN" ? "Admin" : account?.role === "CUSTOMER" ? "Customer" : "Receptionist"}`}
          </p>

          {mode === "edit" ? (
            <div>
              <label
                htmlFor="staff-account-status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Account status
              </label>
              <select
                id="staff-account-status"
                value={values.isActive ? "active" : "inactive"}
                disabled={isSelf}
                onChange={(event) =>
                  updateField("isActive", event.target.value === "active")
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          ) : (
            <Field
              id="staff-password"
              label="Temporary password"
              type="password"
              value={values.password}
              error={fieldErrors.password}
              onChange={(value) => updateField("password", value)}
              hint="Hand this password to the receptionist in person. They must change it at first login."
            />
          )}

          {mode === "edit" && !isSelf && account?.role !== "ADMIN" ? (
            <Field
              id="staff-reset-password"
              label="New temporary password"
              type="password"
              value={values.password}
              error={fieldErrors.password}
              onChange={(value) => updateField("password", value)}
              hint="Optional. The person must change it at the next login."
            />
          ) : null}

          {errorMessage ? (
            <p role="alert" className="text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                  ? "Create account"
                  : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-700">{error}</p> : null}
    </div>
  );
}

function flattenErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];

    if (typeof key === "string" && !fields[key]) {
      fields[key] = issue.message;
    }
  }

  return fields;
}

export default StaffAccountDialog;
