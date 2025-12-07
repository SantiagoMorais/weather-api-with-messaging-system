import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <main className="size-full h-dvh">Hello "/auth/"!</main>;
}
