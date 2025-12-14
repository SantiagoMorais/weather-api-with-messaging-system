import loginBackground from "@/assets/imgs/login-background.webp";
import { HeaderLogo } from "@/components/header-logo";
import { ThemeTogglerButton } from "@/components/theme-toggle-button";
import { UserAvatarButton } from "@/components/user-avatar-button";
import { requireAuth } from "@/core/guards/auth-guard";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Dashboard } from "./-components/dashboard";
import { AIInsightHeaderBar } from "./-components/ai-insight-header-bar";
import { DownloadContentFileButton } from "./-components/dashboard/current-weather-card/download-content-file-button";

export const Route = createFileRoute("/_home/")({
  component: PrivateLayout,
  loader: requireAuth,
});

function PrivateLayout() {
  return (
    <>
      <img
        src={loginBackground}
        className="fixed size-full object-cover opacity-40"
      />
      <main className="relative z-10 flex min-h-dvh w-full max-w-(--breakpoint-2xl) flex-col overflow-x-hidden overflow-y-auto pb-8 md:pb-16">
        <header className="flex w-full items-center gap-4 px-3 py-4 backdrop-blur-sm md:p-6 md:px-10">
          <HeaderLogo />
          <DownloadContentFileButton
            className="static ml-auto opacity-100"
            buttonClassName="border-0 hover:bg-primary/20"
          />
          <ThemeTogglerButton />
          <UserAvatarButton />
        </header>
        <AIInsightHeaderBar />
        <Dashboard />
        <Outlet />
      </main>
    </>
  );
}
