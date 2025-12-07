import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="size-full bg-black">Hello "/auth/"!</div>;
}
