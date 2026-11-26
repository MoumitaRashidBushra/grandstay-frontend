import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import LoginUI from "../components/LoginUI";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import type { LoginCredentials } from "../types/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

function readApiMessage(data: unknown, fallback: string): string {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  return fallback;
}

function LoginPage() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  // Access the function that saves user information and access token.
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  // Convert API failures into the feedback rendered by LoginUI.
  const errorMessage = loginMutation.isError
    ? axios.isAxiosError(loginMutation.error)
      ? !loginMutation.error.response
        ? "We're unable to connect right now. Please check your internet connection and try again."
        : loginMutation.error.response.status === 401
          ? "Invalid email or password"
          : loginMutation.error.response.status === 403
            ? readApiMessage(
                loginMutation.error.response.data,
                "Your account is deactivated. Please contact the hotel.",
              )
          : loginMutation.error.response.status >= 500
            ? "Server error. Please try again later."
            : "Unable to log in. Please try again."
      : "Something went wrong. Please try again."
    : null;

  const onSubmit = async (data: LoginCredentials) => {
    try {
      // Send login credentials to the backend.
      const response = await loginMutation.mutateAsync(data);

      // Save user information and access token in React memory.
      loginUser(response);

      // Clear the login form after successful authentication.
      reset();

      if (response.user.mustResetPw) {
        navigate("/change-password", { replace: true });
        return;
      }

      // Staff (admin and receptionist) share one console; customers use theirs.
      switch (response.user.role) {
        case "ADMIN":
        case "RECEPTIONIST":
          navigate("/staff", { replace: true });
          break;

        case "CUSTOMER":
          navigate("/customer", { replace: true });
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
