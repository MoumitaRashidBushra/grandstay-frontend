import {
  Check,
  CircleCheck,
  Info,
  KeyRound,
  LockKeyhole,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

type EditableField = "fullName" | "email" | null;

function ProfilePage() {
  const { user } = useAuth();

  // Initial profile information from the authenticated user.
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // Keep temporary values while editing.
  const [editName, setEditName] = useState(fullName);
  const [editEmail, setEditEmail] = useState(email);

  const [editingField, setEditingField] = useState<EditableField>(null);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  const accountRole = user?.role ?? "CUSTOMER";

  // Open the selected field for editing.
  const handleEdit = (field: EditableField) => {
    setEditingField(field);
    setEditName(fullName);
    setEditEmail(email);
  };

  // Save the changes locally until the profile API is connected.
  const handleSave = () => {
    if (editingField === "fullName") {
      if (!editName.trim()) return;
      setFullName(editName.trim());
    }

    if (editingField === "email") {
      if (!editEmail.trim()) return;
      setEmail(editEmail.trim());
    }

    setEditingField(null);
  };

  // Cancel editing without changing the displayed information.
  const handleCancel = () => {
    setEditName(fullName);
    setEditEmail(email);
    setEditingField(null);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page heading */}
      <section>
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Customer Portal / My Profile
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Manage your personal information and account security.
        </p>
      </section>

      {/* Profile overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* Circular profile avatar */}
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600">
            <UserRound size={48} strokeWidth={1.5} />
          </div>

          <div className="min-w-0 text-center sm:text-left">
            <h2 className="wrap-break-word text-xl font-bold text-slate-900 sm:text-2xl">
              {fullName || "Customer"}
            </h2>

            <p className="mt-1 break-all text-sm text-slate-500">
              {email || "Email not available"}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {accountRole}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <CircleCheck size={14} />
                Account Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal information */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and edit your personal details.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <UserRound size={20} />
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          {/* Full Name */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <UserRound size={17} />
                Full Name
              </div>

              {editingField !== "fullName" && (
                <button
                  type="button"
                  onClick={() => handleEdit("fullName")}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  <Pencil size={14} />
                  Edit
                </button>
              )}
            </div>

            {editingField === "fullName" ? (
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!editName.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-50"
                  >
                    <Check size={14} />
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-3 wrap-break-word text-base font-semibold text-slate-800">
                {fullName || "Not available"}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Mail size={17} />
                Email Address
              </div>

              {editingField !== "email" && (
                <button
                  type="button"
                  onClick={() => handleEdit("email")}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  <Pencil size={14} />
                  Edit
                </button>
              )}
            </div>

            {editingField === "email" ? (
              <div className="mt-3 space-y-3">
                <input
                  type="email"
                  value={editEmail}
                  onChange={(event) => setEditEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!editEmail.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-50"
                  >
                    <Check size={14} />
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-3 break-all text-base font-semibold text-slate-800">
                {email || "Not available"}
              </p>
            )}
          </div>

          {/* Account Role */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <ShieldCheck size={17} />
              Account Role
            </div>

            <p className="mt-3 text-base font-semibold text-slate-800">
              {accountRole}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Managed by the system administrator.
            </p>
          </div>
        </div>
      </section>

      {/* Account security */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <LockKeyhole size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Account Security
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage your account protection.
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Account Authentication
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your account is protected by the GrandStay authentication
                  system.
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              Protected
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                <KeyRound size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">Password</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Keep your account password secure.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordInfo(!showPasswordInfo)}
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={14} />
              Change Password
            </button>
          </div>

          {showPasswordInfo && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Password Update
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Password change functionality will be connected to the backend
                authentication API.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* API integration notice */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-slate-600" />

        <div>
          <p className="text-sm font-semibold text-slate-800">Profile Update</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Profile changes are currently temporary previews. Permanent updates
            will be available after connecting the backend profile update API.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
