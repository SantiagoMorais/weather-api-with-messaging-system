import { Button } from "@/components/ui/button";
import { navigationRoutes } from "@/utils/navigation-routes";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import logo from "@/assets/imgs/logo.png";

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <header className="bg-secondary/40 flex w-full items-center gap-4 backdrop-blur-sm md:p-6 md:px-8">
        <Link
          to="/"
          className="group block size-12 overflow-hidden duration-300 hover:scale-110 hover:opacity-80"
          title="Home"
        >
          <img src={logo} className="size-full object-cover" />
        </Link>
        <nav className="flex">
          {navigationRoutes.map((route) => (
            <Button
              asChild
              variant="ghost"
              className="text-primary max-w-32 flex-1 capitalize"
            >
              <Link to={route.path} className="">
                {route.name}
              </Link>
            </Button>
          ))}
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
