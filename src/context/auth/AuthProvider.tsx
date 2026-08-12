import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../types/user";
import { authAPI } from "../../api/auth/api";
import Spinner from "../../components/auth/Spinner";
import { getFriendlyError } from "../../utils/getFriendlyError";

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
 
  const [isInitializing, setIsInitializing] = useState(true); 
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
        setIsInitializing(false);
      }
    };
    verifyAuth();
  }, []);

  const googleLogin = async (idToken: string) => {
    try {
    
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
    }
  };

  const login = async (email: string, password: string) => {
    try {
      
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

      if (response.message) {
        setError(response.message);
      }
      return false;
    } catch (err) {
      setError(getFriendlyError(err));
      return false;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    try {
      
      clearError();
      await authAPI.register(fullName, email, password);
      return true;
    } catch (err) {
      setError(getFriendlyError(err));
      return false;
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