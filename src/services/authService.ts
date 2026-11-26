import axios from "axios";
import type { AuthUser } from "../types/auth";
import api from "./api";

// Define the data required to send a login request.
export interface LoginRequest {
  email: string;
  password: string;
}

// Define the data returned by the backend after successful login.
export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

// Define the data returned by the backend after refreshing the access token.
export interface RefreshResponse {
  accessToken: string;
}

// Send login credentials to the backend and return the response data.
export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);

  return response.data;
};

// Request a new access token using the HttpOnly refresh cookie.
// Use Axios directly to avoid triggering the API response interceptor.
export const refreshAccessToken = async (): Promise<RefreshResponse> => {
  const response = await axios.post<RefreshResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    {},
    {
      // Allow the browser to send the HttpOnly refresh cookie.
      withCredentials: true,
    },
  );

  return response.data;
};

// Fetch the currently authenticated user's profile from the backend.
// Bypass the API interceptor because auth state has not stored this token yet.
export const getCurrentUser = async (token: string): Promise<AuthUser> => {
  const response = await axios.get<AuthUser>(
    `${import.meta.env.VITE_API_BASE_URL}/me`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// Log out the user and ask the backend to revoke the refresh token.
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
