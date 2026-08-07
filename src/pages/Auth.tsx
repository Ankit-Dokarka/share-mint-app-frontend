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
    <div className="flex h-dvh w-full overflow-hidden bg-(--color-bg) font-sans">
      {/* Left side image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center overflow-hidden relative bg-(--color-primary)/10">
        <img
          src="/login-page-image.png"
          alt="image for login page"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </div>

      {/* Right side login card */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-sm bg-(--color-surface) border border-(--color-border) shadow-md rounded-(--btn-radius) p-8 md:p-10 flex flex-col items-center gap-6">
          {/* App Logo & Title */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-(--btn-radius) bg-(--color-primary) flex items-center justify-center shadow-sm">
              <FiCreditCard className="h-[58%] w-[58%]" aria-hidden="true" />
            </div>
            <div className="text-center flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-(--color-text)">
                Sharemint
              </h1>
              <p className="text-sm text-(--color-text-muted) font-medium">
                Sign in to manage your expenses
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full p-3 text-center text-xs font-medium text-(--color-danger) bg-(--color-danger)/10 border border-(--color-danger)/20 rounded-(--btn-radius) transition-all duration-200">
              {error}
            </div>
          )}

          {/* Google Login Button Container */}
          <div className="w-full flex flex-col items-center justify-center py-4">
            <div className="shadow-sm rounded-(--btn-radius) overflow-hidden">
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
          <p className="text-xs text-(--color-text-muted) text-center mt-2">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
