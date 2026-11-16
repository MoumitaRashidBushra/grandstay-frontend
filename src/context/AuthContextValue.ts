import { createContext } from "react";
import type { LoginResponse } from "../services/authService";
import type { AuthUser } from "../types/auth";

export interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loginUser: (response: LoginResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
