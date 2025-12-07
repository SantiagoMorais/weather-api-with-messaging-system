import { CardFooter } from "@/components/ui/card";
import { env } from "@/env";

export const SignInCardFooter = () => (
  <CardFooter className="border-primary/40 mt-2 w-full flex-col items-start rounded-md border p-2 px-4 shadow">
    <p className="pb-1 font-medium">Acesse como convidado:</p>
    <p className="text-primary text-sm font-semibold">
      Email: <span className="font-medium">{env.VITE_SEED_USER_EMAIL}</span>
    </p>
    <p className="text-primary text-sm font-semibold">
      Senha: <span className="font-medium">{env.VITE_SEED_USER_PASS}</span>
    </p>
  </CardFooter>
);
