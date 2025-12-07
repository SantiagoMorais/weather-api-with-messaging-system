import { redirect } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";

export function preventAuthAccess() {
  const token = localStorage.getItem("gdash-token");

  if (!token) return true;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp || Date.now() >= exp * 1000) return true;
  } catch {
    return true;
  }

  throw redirect({ to: "/" });
}
