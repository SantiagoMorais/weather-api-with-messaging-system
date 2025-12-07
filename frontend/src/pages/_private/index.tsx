import { HeaderLogo } from "@/components/header-logo";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AIInsightHeaderBar } from "./_home/-components/ai-insight-header-bar";
import { HeaderNavbar } from "./_home/-components/header-navbar";

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <header className="bg-secondary/40 flex w-full items-center gap-4 backdrop-blur-sm md:p-6 md:px-8">
        <HeaderLogo />
        <HeaderNavbar />
        <AIInsightHeaderBar />
      </header>
      <Outlet />
    </main>
  );
}
