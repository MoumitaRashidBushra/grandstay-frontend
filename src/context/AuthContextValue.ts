import { createContext } from "react";
import type { LoginResponse } from "../services/authService";
import type { AuthUser } from "../types/auth";

// Define the authentication data and functions shared across the app.
export interface AuthContextType {
  // Store the currently logged-in user's information.
  user: AuthUser | null;

  // Store the access token in React memory.
  accessToken: string | null;

  // Check whether the user has an active authenticated session.
  isAuthenticated: boolean;

  // Track whether the app is restoring the user's session.
  isInitializing: boolean;

  // Save user information and access token after successful login.
  loginUser: (response: LoginResponse) => void;

  // Update the access token after a successful refresh request.
  updateAccessToken: (token: string) => void;

  // Clear user information and access token during logout.
  logout: () => void;

  // Finish the initial authentication check.
  finishInitialization: () => void;
}

// Create the authentication context with undefined as the default value.
// AuthProvider will provide the actual authentication data.
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
