import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../types/user";
import { authAPI } from "../../api/auth/api";
import Spinner from "../../components/auth/Spinner";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authAPI.checkAuth();

        if (response.success && response.user) {
          setUser({
            _id: response.user._id,
            fullName: response.user.fullName,
            email: response.user.email,
            avatar: response.user.avatar,
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const googleLogin = async (idToken: string) => {
    try {
      setIsLoading(true);
      clearError();

      const response = await authAPI.googleLogin(idToken);

      setUser({
        _id: response.user._id,
        fullName: response.user.fullName,
        email: response.user.email,
        avatar: response.user.avatar,
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      clearError();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="h-dvh w-full bg-(--color-bg)">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        googleLogin,
        logout,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
