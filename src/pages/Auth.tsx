import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";
import { FiCreditCard, FiAlertCircle } from "react-icons/fi";

export default function AuthPage() {
  const navigate = useNavigate();
  const { googleLogin, error, clearError } = useAuth();
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const [isButtonReady, setIsButtonReady] = useState(false);

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

    if (success) {
      navigate("/dashboard");
    }
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
              Sign in to manage your expenses
            </p>
          </div>
        </div>

        <div className="w-full rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) p-8 shadow-lg md:p-10 flex flex-col items-center gap-6">
          <div className="text-center flex flex-col gap-2 w-full">
            <h2
              className="text-xl font-semibold text-(--color-text)"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get Started
            </h2>
            <p className="text-sm text-(--color-text-muted)">
              Use your Google account to continue securely
            </p>
          </div>

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

          <div className="w-full flex flex-col items-center justify-center py-2">
            <div className="relative flex h-10 w-[320px] items-center justify-center">
              {/* Skeleton Loader - pointer-events-none ensures it never blocks clicks */}
              <div
                className={`absolute inset-0 w-full h-full rounded-(--btn-radius) bg-(--color-border) animate-pulse pointer-events-none transition-opacity duration-500 ${isButtonReady ? "opacity-0" : "opacity-100"}`}
              />

              <div
                ref={buttonWrapperRef}
                className={`flex h-10 w-[320px] items-center justify-center rounded-(--btn-radius) overflow-hidden shadow-sm transition-all duration-500 ${isButtonReady ? "opacity-100 scale-100 hover:scale-[1.02] active:scale-[0.98]" : "opacity-0 scale-95"}`}
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    clearError();
                  }}
                  text="continue_with"
                  shape="rectangular"
                  size="large"
                  width="320"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-(--color-text-soft) text-center mt-2 max-w-70 mx-auto leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-(--color-text-soft)">
          © {new Date().getFullYear()} Sharemint. All rights reserved.
        </p>
      </div>
    </main>
  );
}
