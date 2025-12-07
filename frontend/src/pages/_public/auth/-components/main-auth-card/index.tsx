import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";

export const MainAuthCard = () => {
  return (
    <Card>
      <CardContent className="w-full min-w-full">
        <CardHeader className="px-0">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Insira seu email e senha para acessar a plataforma!
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-secondary w-full flex-col items-start p-2 px-4 shadow">
          <p className="pb-1 font-medium">Acesse como convidado:</p>
          <p className="text-primary text-sm">
            Email:{" "}
            <span className="font-semibold">{env.VITE_SEED_USER_EMAIL}</span>
          </p>
          <p className="text-primary text-sm">
            Senha:{" "}
            <span className="font-semibold">{env.VITE_SEED_USER_PASS}</span>
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
