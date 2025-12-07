import { createFileRoute } from "@tanstack/react-router";
import { SignInCardContent } from "./-components/sign-in-card-content";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SignUpCardContent } from "./-components/sign-up-card-content";

export const Route = createFileRoute("/_public/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageSelected, setPageSelected] = useState<"signin" | "signup">(
    "signin"
  );

  const changeAuthPage = () =>
    setPageSelected((prev) => (prev === "signin" ? "signup" : "signin"));

  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <Card className="w-full max-w-96">
        {pageSelected === "signin" ? (
          <SignInCardContent changeAuthPage={changeAuthPage} />
        ) : (
          <SignUpCardContent changeAuthPage={changeAuthPage} />
        )}
      </Card>
    </main>
  );
}
