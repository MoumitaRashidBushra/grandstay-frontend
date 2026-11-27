import axios, { AxiosError, AxiosHeaders, type AxiosAdapter } from "axios";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";
import type { AuthContextType } from "../context/AuthContextValue";
import api from "../services/api";
import { getCurrentUser } from "../services/authService";
import AuthApiSetup from "./AuthApiSetup";

function CurrentPath() {
  const location = useLocation();

  return <output>{location.pathname}</output>;
}

function renderWithAuth(
  pathname: string,
  accessToken: string | null = "test-access-token",
) {
  const authValue: AuthContextType = {
    user: {
      id: "1",
      fullName: "Test User",
      email: "test@example.com",
      role: "CUSTOMER",
      mustResetPw: false,
    },
    accessToken,
    isAuthenticated: Boolean(accessToken),
    isInitializing: false,
    loginUser: vi.fn(),
    updateAccessToken: vi.fn(),
    logout: vi.fn(),
    finishInitialization: vi.fn(),
    markPasswordChanged: vi.fn(),
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={[pathname]}>
        <AuthApiSetup />
        <CurrentPath />
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe("AuthApiSetup", () => {
  const originalApiAdapter = api.defaults.adapter;
  const originalAxiosAdapter = axios.defaults.adapter;

  afterEach(() => {
    api.defaults.adapter = originalApiAdapter;
    axios.defaults.adapter = originalAxiosAdapter;
  });

  it("uses the supplied token while auth state is not initialized", async () => {
    const user = {
      id: "1",
      fullName: "Test User",
      email: "test@example.com",
      role: "CUSTOMER" as const,
      mustResetPw: false,
    };
    let apiClientCalled = false;
    let defaultAxiosCalled = false;
    let authorizationHeader: unknown;
    const apiAdapter: AxiosAdapter = async (config) => {
      apiClientCalled = true;

      return {
        config,
        data: user,
        headers: new AxiosHeaders(),
        status: 200,
        statusText: "OK",
      };
    };
    const defaultAdapter: AxiosAdapter = async (config) => {
      defaultAxiosCalled = true;
      authorizationHeader = config.headers.Authorization;

      return {
        config,
        data: user,
        headers: new AxiosHeaders(),
        status: 200,
        statusText: "OK",
      };
    };
    api.defaults.adapter = apiAdapter;
    axios.defaults.adapter = defaultAdapter;
    renderWithAuth("/customer", null);

    await expect(getCurrentUser("restored-access-token")).resolves.toEqual(
      user,
    );

    expect(defaultAxiosCalled).toBe(true);
    expect(apiClientCalled).toBe(false);
    expect(authorizationHeader).toBe("Bearer restored-access-token");
  });

  it("navigates to no-access for a generic 403 API response", async () => {
    const adapter: AxiosAdapter = async (config) => {
      throw new AxiosError("Forbidden", "ERR_BAD_REQUEST", config, undefined, {
        config,
        data: {
          message: "Forbidden",
          error: "Forbidden",
          statusCode: 403,
        },
        headers: new AxiosHeaders(),
        status: 403,
        statusText: "Forbidden",
      });
    };
    api.defaults.adapter = adapter;
    renderWithAuth("/admin");

    await expect(api.get("/admin/reports")).rejects.toMatchObject({
      response: { status: 403 },
    });

    expect(await screen.findByText("/no-access")).toBeInTheDocument();
  });

  it("sends a password-reset 403 to the change-password page", async () => {
    const adapter: AxiosAdapter = async (config) => {
      throw new AxiosError("Forbidden", "ERR_BAD_REQUEST", config, undefined, {
        config,
        data: {
          message: "Set a new password before continuing.",
          code: "PASSWORD_RESET_REQUIRED",
          statusCode: 403,
        },
        headers: new AxiosHeaders(),
        status: 403,
        statusText: "Forbidden",
      });
    };
    api.defaults.adapter = adapter;
    renderWithAuth("/admin");

    await expect(api.get("/admin/staff")).rejects.toMatchObject({
      response: { status: 403 },
    });

    expect(
      await screen.findByText("/staff/change-password"),
    ).toBeInTheDocument();
  });

  it("does not navigate away for a 403 from the login endpoint", async () => {
    const adapter: AxiosAdapter = async (config) => {
      throw new AxiosError("Forbidden", "ERR_BAD_REQUEST", config, undefined, {
        config,
        data: {
          message: "Forbidden",
          error: "Forbidden",
          statusCode: 403,
        },
        headers: new AxiosHeaders(),
        status: 403,
        statusText: "Forbidden",
      });
    };
    api.defaults.adapter = adapter;
    renderWithAuth("/login");

    await expect(api.post("/auth/login")).rejects.toMatchObject({
      response: { status: 403 },
    });

    expect(screen.getByText("/login")).toBeInTheDocument();
  });
});
