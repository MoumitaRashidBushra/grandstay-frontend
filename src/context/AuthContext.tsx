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

  // Restore the user's session when the application first loads.
  useEffect(() => {
    if (initializationStarted.current) {
      return;
    }

    initializationStarted.current = true;

    const initializeAuth = async () => {
      try {
        // Request a new access token using the HttpOnly refresh cookie.
        const response = await refreshAccessToken();
        const token = response.accessToken;

        // Fetch the authenticated user's profile using the new token.
        const currentUser = await getCurrentUser(token);

        // Store the restored session in React memory.
        setAccessToken(token);
        setUser(currentUser);
      } catch {
        // No valid refresh session exists, so start as logged out.
        setUser(null);
        setAccessToken(null);
      } finally {
        // Allow protected routes to check authentication.
        setIsInitializing(false);
      }
    };

    void initializeAuth();
  }, []);

  // Save user information and access token after successful login.
  const loginUser = useCallback((response: LoginResponse) => {
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
    setUser(null);
    setAccessToken(null);
    setIsInitializing(false);
  }, []);

  // Mark the initial authentication check as complete.
  const finishInitialization = useCallback(() => {
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

    // Both values must exist before the app considers the session authenticated.
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
