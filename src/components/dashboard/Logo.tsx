export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/app-logo.png"
      alt="Splitwise Logo"
      className={`object-contain drop-shadow-md ${className}`}
    />
  );
}
