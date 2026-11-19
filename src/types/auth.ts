export type UserRole = "ADMIN" | "RECEPTIONIST" | "CUSTOMER";

export interface LoginCredentials {
  email: string;
  password: string;
}

// Store the authenticated user's information.
export interface AuthUser {
  id: string;
  fullName: string;
  email: string;

  // The backend /me endpoint also returns the user's mobile number.
  // It is optional because the login response may not include it.
  mobile?: string | null;

  role: UserRole;
  mustResetPw: boolean;
}

// Store the current authentication state.
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // Prevent protected routes from redirecting before session restoration.
  isInitializing: boolean;
}
