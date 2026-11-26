import axios, { type InternalAxiosRequestConfig } from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { refreshAccessToken as requestNewAccessToken } from "../services/authService";

// Store information needed to retry a request safely.
type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _sessionToken?: string | null;
};

// Share one refresh request for requests from the same session.
let refreshPromise: {
  sessionToken: string | null;
  promise: Promise<string>;
} | null = null;

function AuthApiSetup() {
  const { accessToken, updateAccessToken, logout } = useAuth();
  const navigate = useNavigate();

  // Keep the latest access token available to the interceptors.
  const accessTokenRef = useRef(accessToken);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    // Attach the latest access token to outgoing API requests.
    const requestInterceptor = api.interceptors.request.use((config) => {
      const currentToken = accessTokenRef.current;

      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      } else {
        delete config.headers.Authorization;
      }

      // Remember which session originally sent this request.
      const requestConfig = config as RetryableRequestConfig;
      requestConfig._sessionToken = currentToken;

      return config;
    });

    // Handle unauthorized API responses.
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (!axios.isAxiosError(error)) {
          return Promise.reject(error);
        }

        if (error.response?.status === 403) {
          const requestUrl = error.config?.url ?? "";
          const isAuthRequest =
            requestUrl.includes("/auth/login") ||
            requestUrl.includes("/auth/refresh") ||
            requestUrl.includes("/auth/logout");

          if (!isAuthRequest) {
            navigate("/no-access", { replace: true });
          }

          return Promise.reject(error);
        }

        if (error.response?.status !== 401) {
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

        const requestSessionToken = originalRequest._sessionToken ?? null;

        // Ignore an old request if the user has already changed sessions.
        if (accessTokenRef.current !== requestSessionToken) {
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
          const currentSessionToken = accessTokenRef.current;

          // Reuse a refresh request only when it belongs to the same session.
          if (
            !refreshPromise ||
            refreshPromise.sessionToken !== currentSessionToken
          ) {
            const pendingRefresh = requestNewAccessToken()
              .then((response) => {
                // Do not restore a token if the user has changed sessions.
                if (accessTokenRef.current !== currentSessionToken) {
                  throw new Error("Authentication session has changed.");
                }

                updateAccessToken(response.accessToken);

                return response.accessToken;
              })
              .finally(() => {
                // Clear only this refresh request.
                if (refreshPromise?.promise === pendingRefresh) {
                  refreshPromise = null;
                }
              });

            refreshPromise = {
              sessionToken: currentSessionToken,
              promise: pendingRefresh,
            };
          }

          const newAccessToken = await refreshPromise.promise;

          // Check again before retrying the original request.
          if (accessTokenRef.current !== currentSessionToken) {
            return Promise.reject(
              new Error("Authentication session has changed."),
            );
          }

          // Retry the original request with the refreshed access token.
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest._sessionToken = newAccessToken;

          return api(originalRequest);
        } catch (refreshError) {
          // Clear the session only if it is still the same session.
          if (accessTokenRef.current === requestSessionToken) {
            logout();
            navigate("/login", { replace: true });
          }

          return Promise.reject(refreshError);
        }
      },
    );

    // Remove interceptors when this component is unmounted.
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [updateAccessToken, logout, navigate]);

  return null;
}

export default AuthApiSetup;
