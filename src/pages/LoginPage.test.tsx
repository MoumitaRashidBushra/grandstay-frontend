import { AxiosError, AxiosHeaders } from "axios";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

const { mockUseLogin } = vi.hoisted(() => ({
  mockUseLogin: vi.fn(),
}));

vi.mock("../hooks/useLogin", () => ({
  useLogin: mockUseLogin,
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ loginUser: vi.fn() }),
}));

describe("LoginPage", () => {
  it("shows the inactive-account message for ACCOUNT_INACTIVE", () => {
    mockUseLogin.mockReturnValue({
      isError: true,
      isPending: false,
      error: new AxiosError(
        "Forbidden",
        "ERR_BAD_REQUEST",
        undefined,
        undefined,
        {
          config: { headers: new AxiosHeaders() },
          data: {
            code: "ACCOUNT_INACTIVE",
            message: "Forbidden",
            statusCode: 403,
          },
          headers: new AxiosHeaders(),
          status: 403,
          statusText: "Forbidden",
        },
      ),
      mutateAsync: vi.fn(),
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Your account is deactivated. Please contact the hotel.",
    );
  });

  it("does not label an unrelated 403 as an inactive account", () => {
    mockUseLogin.mockReturnValue({
      isError: true,
      isPending: false,
      error: new AxiosError(
        "Forbidden",
        "ERR_BAD_REQUEST",
        undefined,
        undefined,
        {
          config: { headers: new AxiosHeaders() },
          data: {
            message: "Forbidden",
            error: "Forbidden",
            statusCode: 403,
          },
          headers: new AxiosHeaders(),
          status: 403,
          statusText: "Forbidden",
        },
      ),
      mutateAsync: vi.fn(),
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to log in. Please try again.",
    );
    expect(screen.getByRole("alert")).not.toHaveTextContent(
      "Your account is deactivated.",
    );
  });
});
