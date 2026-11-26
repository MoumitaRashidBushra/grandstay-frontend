import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import LoginUI from "../components/LoginUI";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import type { LoginCredentials } from "../types/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

interface LoginRedirectState {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
}

function getApiErrorCode(error: unknown): string | null {
  if (!axios.isAxiosError(error)) {
    return null;
  }

  const responseData: unknown = error.response?.data;

  if (
    typeof responseData !== "object" ||
    responseData === null ||
    !("code" in responseData)
  ) {
    return null;
  }

  return typeof responseData.code === "string" ? responseData.code : null;
}

function LoginPage() {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectState = location.state as LoginRedirectState | null;
  const returnLocation = redirectState?.from;

  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const errorMessage = loginMutation.isError
    ? axios.isAxiosError(loginMutation.error)
      ? !loginMutation.error.response
        ? "We're unable to connect right now. Please check your internet connection and try again."
        : loginMutation.error.response.status === 403 &&
            getApiErrorCode(loginMutation.error) === "ACCOUNT_INACTIVE"
          ? "Your account is deactivated. Please contact the hotel."
          : loginMutation.error.response.status === 401
            ? "Invalid email or password"
            : loginMutation.error.response.status === 429
              ? "Your account is temporarily locked due to too many unsuccessful attempts. Please try again later."
              : loginMutation.error.response.status >= 500
                ? "Server error. Please try again later."
                : "Unable to log in. Please try again."
      : "Something went wrong. Please try again."
    : null;

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      loginUser(response);
      reset();

      if (response.user.mustResetPw) {
        navigate("/staff/change-password", { replace: true });
        return;
      }

      switch (response.user.role) {
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;

        case "RECEPTIONIST":
          navigate("/staff", { replace: true });
          break;

        case "CUSTOMER":
          if (
            returnLocation?.pathname === "/rooms" ||
            returnLocation?.pathname === "/customer" ||
            returnLocation?.pathname?.startsWith("/customer/")
          ) {
            navigate(
              `${returnLocation.pathname}${returnLocation.search ?? ""}${returnLocation.hash ?? ""}`,
              { replace: true },
            );
          } else {
            navigate("/customer", { replace: true });
          }
          break;
      }
    } catch {
      // The mutation error is surfaced through errorMessage above.
    }
  };

  return (
    <LoginUI
      errorMessage={errorMessage}
      errors={errors}
      isPending={loginMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
    />
  );
}

export default LoginPage;
