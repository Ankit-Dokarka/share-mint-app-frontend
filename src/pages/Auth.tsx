import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import useAuth from "../context/auth/AuthContext";
import {
  FiCreditCard,
  FiAlertCircle,
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useForm } from "react-hook-form";

type FormData = {
  fullName?: string;
  email: string;
  password: string;
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { googleLogin, login, register, error, clearError } = useAuth();
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const [isButtonReady, setIsButtonReady] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  
  const [isLoading, setIsLoading] = useState(false);
 
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    const interval = setInterval(() => {
      const wrapper = buttonWrapperRef.current;
      if (wrapper && wrapper.innerHTML.length > 50) {
        setIsButtonReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) return;
    clearError();
    const success = await googleLogin(credentialResponse.credential);
    if (success) navigate("/dashboard");
  };

  const onSubmit = async (data: FormData) => {
    clearError();
    setIsLoading(true); 
    try {
      if (isLogin) {
        const success = await login(data.email, data.password);
        if (success) navigate("/dashboard");
      } else {
        if (!data.fullName) return;
        const success = await register(data.fullName, data.email, data.password);
        if (success) {
          navigate("/verify-email", {
            state: { email: data.email, fromSignup: true },
          });
        }
      }
    } finally {
      setIsLoading(false); 
    }
  };

  const handleToggle = () => {
    if (isLoading) return;
    clearError();
    reset();
    setShowPassword(false); 
    setIsLogin((prev) => !prev);
  };

  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-(--color-bg) p-4 font-sans md:p-8">
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-(--color-primary)/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-(--color-primary)/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-(--btn-radius) bg-(--color-primary) shadow-lg shadow-(--color-primary)/20 transition-transform hover:scale-105">
            <FiCreditCard className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <h1
              className="text-3xl font-bold tracking-tight text-(--color-text)"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sharemint
            </h1>
            <p className="text-sm font-medium text-(--color-text-muted)">
              {isLogin
                ? "Sign in to manage your expenses"
                : "Create an account to get started"}
            </p>
          </div>
        </div>

        <div className="w-full rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) p-8 shadow-lg md:p-10 flex flex-col items-center gap-6">
          <div className="text-center flex flex-col gap-2 w-full">
            <h2
              className="text-xl font-semibold text-(--color-text)"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-sm text-(--color-text-muted)">
              {isLogin
                ? "Enter your details to access your account"
                : "Use your email to create an account"}
            </p>
          </div>

          {/* Error Display */}
          <div
            className={`grid w-full transition-all duration-300 ease-in-out ${error ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden flex items-center justify-center gap-2">
              <FiAlertCircle
                className="h-3.5 w-3.5 shrink-0 text-(--color-danger)"
                aria-hidden="true"
              />
              <p className="text-xs font-medium text-(--color-danger) leading-relaxed">
                {error}
              </p>
            </div>
          </div>

          {/* Email/Password Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
            noValidate
          >
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-(--color-text-muted)">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
                    size={16}
                  />
                  <input
                    type="text"
                    {...registerField("fullName", {
                      required: !isLogin ? "Full name is required" : false,
                      minLength: {
                        value: 6,
                        message: "Full name must be at least 6 characters long",
                      },
                    })}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary) transition-all"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-(--color-danger)">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--color-text-muted)">
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
                  size={16}
                />
                <input
                  type="email"
                  {...registerField("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary) transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-(--color-danger)">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--color-text-muted)">
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...registerField("password", {
                    required: "Password is required",
                    validate: (value) => {
                      if (value.length < 6) {
                        return "Password must be at least 6 characters long";
                      }
                      if (!isLogin) {
                        if (!/[A-Z]/.test(value)) {
                          return "Must contain at least one uppercase letter";
                        }
                        if (!/\d/.test(value)) {
                          return "Must contain at least one digit";
                        }
                        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
                          return "Must contain at least one symbol";
                        }
                      }
                      return true;
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary) transition-all"
                />
                {/* Eye Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) hover:text-(--color-text) transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-(--color-danger)">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-xl bg-(--color-primary) text-white font-semibold transition-all duration-200 shadow-md mt-2 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer hover:bg-(--color-primary-hover) hover:shadow-lg hover:shadow-(--color-primary)/30 active:scale-[0.98]"
              }`}
            >
              {isLoading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-(--color-border)"></div>
            <span className="text-xs text-(--color-text-muted) font-medium">
              OR
            </span>
            <div className="flex-1 h-px bg-(--color-border)"></div>
          </div>

          {/* Google Login Button */}
          <div className="w-full flex flex-col items-center justify-center py-2">
            <div className="relative flex h-10 w-[320px] items-center justify-center">
              <div
                className={`absolute inset-0 w-full h-full rounded-(--btn-radius) bg-(--color-border) animate-pulse pointer-events-none transition-opacity duration-500 ${isButtonReady ? "opacity-0" : "opacity-100"}`}
              />
              <div
                ref={buttonWrapperRef}
                className={`flex h-10 w-[320px] items-center justify-center rounded-(--btn-radius) overflow-hidden shadow-sm transition-all duration-500 ${isButtonReady ? "opacity-100 scale-100 hover:scale-[1.02] active:scale-[0.98]" : "opacity-0 scale-95"}`}
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => clearError()}
                  text="continue_with"
                  shape="rectangular"
                  size="large"
                  width="320"
                />
              </div>
            </div>
          </div>

         
          <p className="text-sm text-(--color-text-muted) text-center mt-2">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={handleToggle}
              disabled={isLoading}
              className={`font-semibold transition-colors ${
                isLoading
                  ? "text-(--color-text-muted) cursor-not-allowed opacity-70"
                  : "text-(--color-primary) hover:underline cursor-pointer"
              }`}
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}