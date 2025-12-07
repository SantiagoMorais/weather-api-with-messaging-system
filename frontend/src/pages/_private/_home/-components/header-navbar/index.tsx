import { Button } from "@/components/ui/button";
import { navigationRoutes } from "@/utils/arrays/navigation-routes";
import { Link } from "@tanstack/react-router";

export const HeaderNavbar = () => (
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
);
