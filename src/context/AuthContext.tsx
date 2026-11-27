import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LoginResponse } from "../services/authService";
import { getCurrentUser, refreshAccessToken } from "../services/authService";
import type { AuthUser } from "../types/auth";
import type { AuthContextType } from "./AuthContextValue";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Keep the app in loading state until the initial session check finishes.
  const [isInitializing, setIsInitializing] = useState(true);

  // Prevent duplicate initialization during React StrictMode effect replay.
  const initializationStarted = useRef(false);

  // Identify the current authentication session.
  // This prevents an old initialization request from overwriting a newer session.
  const authOperationVersion = useRef(0);

  // Restore the user's session when the application first loads.
  useEffect(() => {
    if (initializationStarted.current) {
      return;
    }

    initializationStarted.current = true;

    // Remember which session was active when initialization started.
    const initializationVersion = authOperationVersion.current;

    const initializeAuth = async () => {
      try {
        // Request a new access token using the HttpOnly refresh cookie.
        const response = await refreshAccessToken();
        const token = response.accessToken;

        // Fetch the authenticated user's profile using the new token.
        const currentUser = await getCurrentUser(token);

        // Ignore the result if login or logout happened meanwhile.
        if (authOperationVersion.current !== initializationVersion) {
          return;
        }

        // Store the restored session in React memory.
        setAccessToken(token);
        setUser(currentUser);
      } catch {
        // Ignore errors from an outdated initialization request.
        if (authOperationVersion.current !== initializationVersion) {
          return;
        }

        // No valid refresh session exists, so start as logged out.
        setUser(null);
        setAccessToken(null);
      } finally {
        // Only the current initialization may finish the loading state.
        if (authOperationVersion.current === initializationVersion) {
          setIsInitializing(false);
        }
      }
    };

    void initializeAuth();
  }, []);

  // Save user information and access token after successful login.
  const loginUser = useCallback((response: LoginResponse) => {
    // Invalidate any older initialization request.
    authOperationVersion.current += 1;

    setUser(response.user);
    setAccessToken(response.accessToken);
    setIsInitializing(false);
  }, []);

  // Update only the access token after a successful refresh request.
  const updateAccessToken = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  // Clear user information and access token during logout.
  const logout = useCallback(() => {
    // Invalidate any pending initialization request.
    authOperationVersion.current += 1;

    setUser(null);
    setAccessToken(null);
    setIsInitializing(false);
  }, []);

  // Mark the initial authentication check as complete.
  const finishInitialization = useCallback(() => {
    // Prevent a pending initialization request from changing the auth state.
    authOperationVersion.current += 1;

    setIsInitializing(false);
  }, []);

  const markPasswordChanged = useCallback(() => {
    setUser((current) =>
      current ? { ...current, mustResetPw: false } : current,
    );
  }, []);

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!accessToken && !!user,
    isInitializing,
    loginUser,
    updateAccessToken,
    logout,
    finishInitialization,
    markPasswordChanged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
