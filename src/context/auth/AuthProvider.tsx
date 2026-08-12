import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../types/user";
import { authAPI } from "../../api/auth/api";
import Spinner from "../../components/auth/Spinner";
import { getFriendlyError } from "../../utils/getFriendlyError";

type AuthProviderProps = { children: ReactNode };

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
      setError(getFriendlyError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

 
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      clearError();
      const response = await authAPI.login(email, password);
      if (response.success && response.user) {
        setUser({
          _id: response.user._id,
          fullName: response.user.fullName,
          email: response.user.email,
          avatar: response.user.avatar,
        });
        return true;
      }
      return false;
    } catch (err) {
      setError(getFriendlyError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

 
  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      clearError();
      await authAPI.register(fullName, email, password);
      return true;
    } catch (err) {
      setError(getFriendlyError(err));
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
      setError(getFriendlyError(err));
    }
  };

  if (isLoading && !user) {
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
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
