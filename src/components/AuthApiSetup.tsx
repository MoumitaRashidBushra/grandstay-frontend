import axios, { type InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { refreshAccessToken as requestNewAccessToken } from "../services/authService";

// Allow an original request to be retried only once.
type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// Share one refresh request when multiple API requests receive 401 together.
let refreshPromise: Promise<string> | null = null;

function AuthApiSetup() {
  const { accessToken, updateAccessToken, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Attach the current access token to outgoing API requests.
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    // Handle unauthorized API responses.
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
          return Promise.reject(error);
        }

        const originalRequest = error.config as
          RetryableRequestConfig | undefined;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        const requestUrl = originalRequest.url ?? "";

        // Do not refresh tokens for authentication endpoints.
        const isAuthRequest =
          requestUrl.includes("/auth/login") ||
          requestUrl.includes("/auth/refresh") ||
          requestUrl.includes("/auth/logout");

        if (isAuthRequest) {
          return Promise.reject(error);
        }

        // End the session if the retried request also receives 401.
        if (originalRequest._retry) {
          logout();
          navigate("/login", { replace: true });

          return Promise.reject(error);
        }

        // Prevent the same request from being retried multiple times.
        originalRequest._retry = true;

        try {
          // Reuse an ongoing refresh request when possible.
          if (!refreshPromise) {
            refreshPromise = requestNewAccessToken()
              .then((response) => {
                updateAccessToken(response.accessToken);
                return response.accessToken;
              })
              .finally(() => {
                refreshPromise = null;
              });
          }

          const newAccessToken = await refreshPromise;

          // Retry the original request with the new access token.
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          // Clear the local session if refreshing fails.
          logout();
          navigate("/login", { replace: true });

          return Promise.reject(refreshError);
        }
      },
    );

    // Remove interceptors when this component is unmounted or updated.
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, updateAccessToken, logout, navigate]);

  return null;
}

export default AuthApiSetup;
