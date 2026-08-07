export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/app-logo.png"
      alt="Sharemint Logo"
      className={`object-contain ${className}`}
    />
  );
}
