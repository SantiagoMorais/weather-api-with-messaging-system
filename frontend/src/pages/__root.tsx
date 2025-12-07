import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
}); // every page that acts as a route must contain this into the top of the component file

function RootComponent() {
  return (
    <section className="bg-background flex h-dvh w-screen flex-col items-center">
      <Outlet />
    </section>
  );
}
