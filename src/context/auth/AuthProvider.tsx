import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User, AuthResponse } from "../../types/auth";
import { authAPI } from "../../api/auth/api";
import Spinner from "../../components/auth/Spinner";
import { getFriendlyError } from "../../utils/getFriendlyError";

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState("");

  const clearError = useCallback(() => setError(""), []);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authAPI.checkAuth();
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };
    verifyAuth();
  }, []);

  const handleAuthSuccess = useCallback((response: AuthResponse): boolean => {
    if (response.success && response.user) {
      setUser(response.user);
      return true;
    }
    if (response.message) {
      setError(response.message);
    }
    return false;
  }, []);

  const googleLogin = useCallback(
    async (idToken: string) => {
      try {
        clearError();
        const response = await authAPI.googleLogin(idToken);
        return handleAuthSuccess(response);
      } catch (err) {
        setError(getFriendlyError(err));
        return false;
      }
    },
    [clearError, handleAuthSuccess],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        clearError();
        const response = await authAPI.login(email, password);
        return handleAuthSuccess(response);
      } catch (err) {
        setError(getFriendlyError(err));
        return false;
      }
    },
    [clearError, handleAuthSuccess],
  );

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      try {
        clearError();
        await authAPI.register(fullName, email, password);
        return true;
      } catch (err) {
        setError(getFriendlyError(err));
        return false;
      }
    },
    [clearError],
  );

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
      setUser(null);
      clearError();
    } catch (err) {
      setError(getFriendlyError(err));
    }
  }, [clearError]);

  if (isInitializing && !user) {
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
        login,
        register,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
