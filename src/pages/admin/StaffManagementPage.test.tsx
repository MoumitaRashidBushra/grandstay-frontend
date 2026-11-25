import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StaffManagementPage from "./StaffManagementPage";

const { listStaff, createStaff, updateStaff } = vi.hoisted(() => ({
  listStaff: vi.fn(),
  createStaff: vi.fn(),
  updateStaff: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "1", role: "ADMIN", fullName: "System Admin" },
  }),
}));

vi.mock("../../services/staffService", () => ({
  listStaff,
  createStaff,
  updateStaff,
}));

const roster = {
  staff: [
    {
      id: "1",
      fullName: "System Admin",
      email: "admin@grandstay.example",
      mobile: "01711000001",
      role: "ADMIN" as const,
      isActive: true,
      mustResetPw: false,
      createdAt: "2026-11-25T00:00:00.000Z",
    },
    {
      id: "2",
      fullName: "Rubina Akter",
      email: "reception1@grandstay.example",
      mobile: "01722000001",
      role: "RECEPTIONIST" as const,
      isActive: true,
      mustResetPw: false,
      createdAt: "2026-11-25T00:00:00.000Z",
    },
  ],
  summary: { total: 2, admins: 1, receptionists: 1, active: 2 },
};

function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={client}>
      <StaffManagementPage />
    </QueryClientProvider>,
  );
}

describe("StaffManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listStaff.mockResolvedValue(roster);
    createStaff.mockResolvedValue(roster.staff[1]);
    updateStaff.mockResolvedValue({ ...roster.staff[1], isActive: false });
  });

  it("lists staff and lets an admin create, reassign, and deactivate accounts", async () => {
    const user = userEvent.setup();
    renderPage();

    expect(await screen.findByText("Rubina Akter")).toBeInTheDocument();
    expect(screen.getByText("2 shown")).toBeInTheDocument();
    expect(screen.getByText("Total Staff")).toBeInTheDocument();

    const deactivateButtons = screen.getAllByRole("button", {
      name: "Deactivate",
    });
    expect(deactivateButtons[0]).toBeDisabled();

    await user.click(deactivateButtons[1]);

    await waitFor(() => {
      expect(updateStaff).toHaveBeenCalledWith("2", { isActive: false });
    });

    await user.click(screen.getByRole("button", { name: "Add Staff Member" }));
    await user.type(screen.getByLabelText("Full name"), "Nabila Chowdhury");
    await user.type(
      screen.getByLabelText("Email"),
      "nabila.staff@grandstay.example",
    );
    await user.type(screen.getByLabelText("Mobile"), "01733000008");
    await user.type(
      screen.getByLabelText("Temporary password"),
      "Password@123",
    );
    await user.selectOptions(screen.getByLabelText("Role"), "ADMIN");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(createStaff).toHaveBeenCalledWith({
        fullName: "Nabila Chowdhury",
        email: "nabila.staff@grandstay.example",
        mobile: "01733000008",
        role: "ADMIN",
        password: "Password@123",
      });
    });
  });

  it("searches staff by the typed name", async () => {
    const user = userEvent.setup();
    renderPage();

    await screen.findByText("Rubina Akter");
    await user.type(screen.getByLabelText("Search Staff"), "rubina");

    await waitFor(() => {
      expect(listStaff).toHaveBeenCalledWith({ search: "rubina", role: "" });
    });
  });
});
