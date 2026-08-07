import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiShield, FiLoader } from "react-icons/fi";

type OTPForm = {
  otp: string[];
};

export default function VerifyEmail() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleSubmit, setValue, watch } = useForm<OTPForm>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const otpValues = watch("otp");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (error) setError("");

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

  const onSubmit = (data: OTPForm) => {
    const finalOtp = data.otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setIsVerifying(true);
    setError("");

    setTimeout(() => {
      setIsVerifying(false);
      if (finalOtp === "123456") {
        window.location.href = "/dashboard";
      } else {
        setError("Invalid OTP. Please try again.");
        setValue("otp", ["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const isComplete = otpValues.every((d) => d !== "");

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center bg-(--color-bg) p-4 overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-(--color-primary)/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-(--color-success)/10 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-(--color-surface)/80 backdrop-blur-xl border border-(--color-border) shadow-2xl rounded-2xl p-8 md:p-10 flex flex-col gap-8 z-10">
        {/* Header Section */}
        <div className="text-center flex flex-col gap-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-(--color-primary) shadow-lg shadow-(--color-primary)/30 mb-2">
            <FiShield className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-(--color-text) mb-1.5">
              Verify Your Email
            </h1>
            <p className="text-sm text-(--color-text-muted) font-medium max-w-xs mx-auto">
              We've sent a 6-digit code to your email. Please enter it below.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {/* OTP Inputs */}
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

            {/* Error Message */}
            <p className="text-(--color-danger) text-xs font-medium min-h-4 text-center">
              {error}
            </p>
          </div>

          {/* Submit Button */}
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

          {/* Resend Code Helper */}
          <div className="text-center text-sm text-(--color-text-muted)">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-semibold text-(--color-primary) hover:underline transition-colors"
            >
              Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
