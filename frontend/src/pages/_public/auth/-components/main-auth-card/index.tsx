import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthForm } from "./auth-form";
import { MainAuthCardFooter } from "./main-auth-card-footer";

export const MainAuthCard = () => {
  return (
    <Card className="w-full max-w-96">
      <CardContent className="w-full min-w-full space-y-2">
        <CardHeader className="mb-4 px-0">
          <CardTitle className="text-lg">Login</CardTitle>
          <CardDescription>
            Insira seu email e senha para acessar a plataforma!
          </CardDescription>
        </CardHeader>
        <AuthForm />
        <Button variant="outline" className="w-full">
          Realizar cadastro
        </Button>
        <MainAuthCardFooter />
      </CardContent>
    </Card>
  );
};
