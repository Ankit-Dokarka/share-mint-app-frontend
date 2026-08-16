import { useState, memo } from "react";
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
import {
  useForm,
  type UseFormRegister,
  type RegisterOptions,
} from "react-hook-form";

type FormData = {
  fullName?: string;
  email: string;
  password: string;
};

const FormInput = memo(
  ({
    id,
    label,
    type,
    icon,
    placeholder,
    validation,
    register,
    error,
    showPasswordToggle,
    showPassword,
    onTogglePassword,
  }: {
    id: keyof FormData;
    label: string;
    type: string;
    icon: React.ReactNode;
    placeholder: string;

    validation: RegisterOptions<FormData>;
    register: UseFormRegister<FormData>;
    error?: string;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-(--color-text-muted)"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validation)}
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary) transition-all"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) hover:text-(--color-text) transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-(--color-danger)">{error}</p>}
    </div>
  ),
);
FormInput.displayName = "FormInput";

export default function AuthPage() {
  const navigate = useNavigate();
  const {
    googleLogin,
    login,
    register: registerUser,
    error,
    clearError,
  } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

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
        const success = await registerUser(
          data.fullName,
          data.email,
          data.password,
        );
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

  const passwordValidation: RegisterOptions<FormData> = {
    required: "Password is required",
    validate: (value) => {
      if (!value) return "Password is required";

      if (value.length < 6)
        return "Password must be at least 6 characters long";
      if (!isLogin) {
        if (!/[A-Z]/.test(value))
          return "Must contain at least one uppercase letter";
        if (!/\d/.test(value)) return "Must contain at least one digit";
        if (!/[^a-zA-Z0-9]/.test(value))
          return "Must contain at least one symbol";
      }
      return true;
    },
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

          <div
            className={`grid w-full transition-all duration-300 ease-in-out ${error ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            aria-live="assertive"
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
            noValidate
          >
            {!isLogin && (
              <FormInput
                id="fullName"
                label="Full Name"
                type="text"
                icon={<FiUser size={16} />}
                placeholder="John Doe"
                register={register}
                validation={{
                  required: !isLogin ? "Full name is required" : false,
                  minLength: {
                    value: 6,
                    message: "Full name must be at least 6 characters long",
                  },
                }}
                error={errors.fullName?.message}
              />
            )}

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              icon={<FiMail size={16} />}
              placeholder="you@example.com"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              error={errors.email?.message}
            />

            <FormInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={<FiLock size={16} />}
              placeholder="••••••••"
              register={register}
              validation={passwordValidation}
              error={errors.password?.message}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
            />

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

          <div className="w-full flex flex-col items-center justify-center py-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => clearError()}
              text="continue_with"
              shape="rectangular"
              size="large"
              width="320"
            />
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
