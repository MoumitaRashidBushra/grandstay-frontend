export type UserRole = "ADMIN" | "RECEPTIONIST" | "CUSTOMER";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  mustResetPw: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
