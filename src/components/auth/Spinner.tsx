export default function Spinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm" ? "w-5 h-5" : size === "lg" ? "w-12 h-12" : "w-8 h-8";

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`${sizeClass} border-4 border-(--color-border) border-t-(--color-primary) rounded-full animate-spin`}
        style={{ animationDuration: "0.6s" }}
      ></div>
    </div>
  );
}
