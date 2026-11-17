import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginUI from "../components/LoginUI";
import { useLogin } from "../hooks/useLogin";
import type { LoginCredentials } from "../types/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
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
          : loginMutation.error.response.status >= 500
            ? "Server error. Please try again later."
            : "Unable to log in. Please try again."
      : "Something went wrong. Please try again."
    : null;

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      console.log("Login successful:", response);
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
