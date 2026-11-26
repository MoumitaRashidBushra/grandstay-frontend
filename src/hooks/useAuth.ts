import { useContext } from "react";
import { AuthContext } from "../context/AuthContextValue";

// Custom hook to access authentication data from any component.
export function useAuth() {
  const context = useContext(AuthContext);

  // Prevent using this hook outside the AuthProvider.
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
