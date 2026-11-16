import type { ReactNode } from "react";
import { useState } from "react";
import type { LoginResponse } from "../services/authService";
import type { AuthUser } from "../types/auth";
import type { AuthContextType } from "./AuthContextValue";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const loginUser = (response: LoginResponse) => {
    setUser(response.user);
    setAccessToken(response.accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    // Both values must exist before the app considers the session authenticated.
    isAuthenticated: !!accessToken && !!user,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
