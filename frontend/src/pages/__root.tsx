import { NotFoundComponent } from "@/components/not-found-component";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
}); // every page that acts as a route must contain this into the top of the component file

function RootComponent() {
  return (
    <section className="bg-background flex min-h-dvh w-full flex-col items-center transition-colors duration-300">
      <Outlet />
    </section>
  );
}
