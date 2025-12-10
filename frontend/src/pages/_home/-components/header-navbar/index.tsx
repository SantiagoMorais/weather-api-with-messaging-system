import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigationRoutes } from "@/utils/arrays/navigation-routes";
import { Link } from "@tanstack/react-router";

export const HeaderNavbar = ({
  className,
  onProfile,
}: {
  className?: string;
  onProfile?: boolean;
}) => (
  <nav className={cn("hidden md:flex", className)}>
    {navigationRoutes.map((route) => (
      <Button
        asChild
        variant="ghost"
        className={cn(
          "text-primary w-full max-w-40 min-w-full flex-1 capitalize md:min-w-auto",
          onProfile && "min-w-full md:min-w-full"
        )}
      >
        <Link to={route.path} className="">
          {route.name}
        </Link>
      </Button>
    ))}
  </nav>
);
