import { HeaderLogo } from "@/components/header-logo";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AIInsightHeaderBar } from "./_home/-components/ai-insight-header-bar";
import { HeaderNavbar } from "./_home/-components/header-navbar";
import { requireAuth } from "@/core/guards/auth-guard";
import { ThemeTogglerButton } from "@/components/theme-toggle-button";

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
  loader: requireAuth,
});

function RouteComponent() {
  return (
    <main className="h-dvh w-full max-w-(--breakpoint-2xl) overflow-x-hidden">
      <header className="flex w-full items-center gap-4 backdrop-blur-sm md:p-6 md:px-10">
        <HeaderLogo />
        <HeaderNavbar />
        <ThemeTogglerButton className="ml-auto" />
      </header>
      <AIInsightHeaderBar />
      <Outlet />
    </main>
  );
}
