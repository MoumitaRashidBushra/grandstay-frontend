import { useContext } from "react";
import { AuthContext } from "../context/AuthContextValue";

// Custom hook to access authentication data from any component.
export function useAuth() {
  // Read the authentication context provided by AuthProvider.
  const context = useContext(AuthContext);

  // Prevent using this hook outside the AuthProvider.
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  // Return the authentication data and methods.

  return context;
}
