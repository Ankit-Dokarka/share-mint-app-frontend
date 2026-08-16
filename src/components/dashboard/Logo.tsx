import { memo } from "react";
import { FiCreditCard } from "react-icons/fi";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <span
      aria-label="Sharemint Logo"
      className={`inline-flex items-center justify-center rounded-(--btn-radius) bg-(--color-primary) text-white shadow-sm ${className}`}
    >
      <FiCreditCard className="h-[58%] w-[58%]" aria-hidden="true" />
    </span>
  );
};

export default memo(Logo);
