import { HeaderLogo } from "@/components/header-logo";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AIInsightHeaderBar } from "./_home/-components/ai-insight-header-bar";
import { HeaderNavbar } from "./_home/-components/header-navbar";
import { requireAuth } from "@/core/guards/auth-guard";
import { ThemeTogglerButton } from "@/components/theme-toggle-button";
import { UserAvatarButton } from "@/components/user-avatar-button";
import loginBackground from "@/assets/imgs/login-background.webp";

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
  loader: requireAuth,
});

function RouteComponent() {
  return (
    <main className="flex h-dvh w-full max-w-(--breakpoint-2xl) flex-col overflow-x-hidden">
      <header className="flex w-full items-center gap-4 px-3 py-4 backdrop-blur-sm md:p-6 md:px-10">
        <HeaderLogo />
        <HeaderNavbar />
        <ThemeTogglerButton className="ml-auto" />
        <UserAvatarButton />
      </header>
      <AIInsightHeaderBar />
      <section className="relative flex-1">
        <img
          src={loginBackground}
          className="border-primary absolute z-0 size-full h-9/10 rounded-lg border-2 object-cover opacity-30"
        />{" "}
        <Outlet />
      </section>
    </main>
  );
}
