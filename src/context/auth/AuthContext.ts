import { createContext, useContext } from "react";
import type { User } from "../../types/user";

type AuthContextType = {
  user: User | null;
  googleLogin: (idToken: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}