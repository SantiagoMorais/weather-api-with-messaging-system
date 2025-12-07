import { createFileRoute } from "@tanstack/react-router";
import { MainAuthCard } from "./-components/main-auth-card";

export const Route = createFileRoute("/_public/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <MainAuthCard />
    </main>
  );
}
