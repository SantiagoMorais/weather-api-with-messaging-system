import { redirect } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";

export function requireAuth() {
  const token = localStorage.getItem("gdash-token");

  if (!token) throw redirect({ to: "/login" });

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp || Date.now() >= exp * 1000) throw redirect({ to: "/login" });
  } catch {
    throw redirect({ to: "/login" });
  }

  return true;
}
