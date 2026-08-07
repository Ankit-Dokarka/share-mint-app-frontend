import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="min-h-[calc(100dvh-8rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-(--color-text)">
          Welcome to Splitwise!
        </h1>
        {user?.fullName && (
          <p className="mt-3 text-sm md:text-base text-(--color-text-muted)">
            Hi {user.fullName}, choose Groups to manage shared expenses.
          </p>
        )}
      </div>
    </section>
  );
}
