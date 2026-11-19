import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";

// Custom hook to manage the login API request.
export const useLogin = () => {
  return useMutation({
    // Call the login API with the user's email and password.
    mutationFn: login,
  });
};
