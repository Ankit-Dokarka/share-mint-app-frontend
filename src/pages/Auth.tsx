import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";
import { FiCreditCard } from "react-icons/fi";

export default function AuthPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { googleLogin } = useAuth();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) return;

    const success = await googleLogin(credentialResponse.credential);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-(--color-bg) p-4 font-sans md:p-8">
      {/* Subtle background decorations (No gradients, just flat opacity) */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-(--color-primary)/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-(--color-primary)/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* App Logo & Top Title */}
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

        {/* Login Card */}
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

          {/* Error Message */}
          {error && (
            <div className="w-full p-3 text-center text-xs font-medium text-(--color-danger) bg-(--color-danger-soft) border border-(--color-danger)/20 rounded-(--btn-radius) transition-all duration-200">
              {error}
            </div>
          )}

          {/* Google Login Button Container */}
          <div className="w-full flex flex-col items-center justify-center py-2">
            <div className="shadow-sm rounded-(--btn-radius) overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setError("Google Login Failed");
                  console.log("Google Login Failed");
                }}
                text="continue_with"
                shape="rectangular"
                size="large"
                width="320"
              />
            </div>
          </div>

          {/* Footer / Terms */}
          <p className="text-xs text-(--color-text-soft) text-center mt-2 max-w-70 mx-auto leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Copyright Text */}
        <p className="mt-8 text-center text-xs text-(--color-text-soft)">
          © {new Date().getFullYear()} Sharemint. All rights reserved.
        </p>
      </div>
    </main>
  );
}
