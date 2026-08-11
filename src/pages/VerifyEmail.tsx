import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { FiShield, FiLoader, FiCheckCircle } from "react-icons/fi";
import { authAPI } from "../api/auth/api";
import { getFriendlyError } from "../utils/getFriendlyError";

type OTPForm = {
  otp: string[];
};

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from the Register page
  const email = location.state?.email || "";

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleSubmit, setValue, watch } = useForm<OTPForm>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const otpValues = watch("otp");

  useEffect(() => {
    // If user navigates here directly without email, send them back to login
    if (!email) {
      navigate("/login");
      return;
    }
    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (error) setError("");
    if (successMsg) setSuccessMsg("");

    const value = e.target.value.replace(/\D/g, "");

    if (value.length > 1) {
      const pastedDigits = value.slice(0, 6).split("");
      const newOtp = ["", "", "", "", "", ""];
      pastedDigits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setValue("otp", newOtp);
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    setValue(`otp.${index}`, value);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OTPForm) => {
    const finalOtp = data.otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const response = await authAPI.verifyEmail(email, finalOtp);
      setSuccessMsg(response.message + " Redirecting to login...");

      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(getFriendlyError(err));
      setValue("otp", ["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    setSuccessMsg("");

    try {
      const response = await authAPI.resendOTP(email);
      setSuccessMsg(response.message);
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = otpValues.every((d) => d !== "");

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center bg-(--color-bg) p-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-(--color-primary)/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-(--color-success)/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md bg-(--color-surface)/80 backdrop-blur-xl border border-(--color-border) shadow-2xl rounded-2xl p-8 md:p-10 flex flex-col gap-8 z-10">
        <div className="text-center flex flex-col gap-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-(--color-primary) shadow-lg shadow-(--color-primary)/30 mb-2">
            <FiShield className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-(--color-text) mb-1.5">
              Verify Your Email
            </h1>
            <p className="text-sm text-(--color-text-muted) font-medium max-w-xs mx-auto">
              We've sent a 6-digit code to{" "}
              <span className="font-bold text-(--color-text)">{email}</span>.
              Please enter it below.
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-2 md:gap-3">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className={`w-full h-14 md:h-16 text-center text-2xl font-bold border-2 rounded-xl text-(--color-text) focus:outline-none transition-all duration-200 bg-(--color-surface) ${
                    error
                      ? "border-(--color-danger) focus:ring-4 focus:ring-(--color-danger)/10"
                      : "border-(--color-border) focus:border-(--color-primary) focus:ring-4 focus:ring-(--color-primary)/10 focus:scale-105"
                  }`}
                />
              ))}
            </div>

            {/* Error or Success Message */}
            {error && (
              <p className="text-(--color-danger) text-xs font-medium min-h-4 text-center flex items-center justify-center gap-1.5">
                <FiShield className="text-danger" size={12} /> {error}
              </p>
            )}
            {successMsg && (
              <p className="text-(--color-success) text-xs font-medium min-h-4 text-center flex items-center justify-center gap-1.5">
                <FiCheckCircle size={12} /> {successMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isComplete || isVerifying}
            className="w-full p-3 rounded-xl bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-(--color-primary)/30 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            {isVerifying ? (
              <>
                <FiLoader className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </button>

          <div className="text-center text-sm text-(--color-text-muted)">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-(--color-primary) hover:underline transition-colors disabled:opacity-50 flex items-center gap-1 inline-flex"
            >
              {isResending ? (
                <FiLoader className="animate-spin" size={12} />
              ) : (
                "Resend"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
