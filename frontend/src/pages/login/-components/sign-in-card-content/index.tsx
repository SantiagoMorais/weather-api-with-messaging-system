import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "./sign-in-form";
import { SignInCardFooter } from "./sign-in-card-footer";

export const SignInCardContent = ({
  changeAuthPage,
}: {
  changeAuthPage: () => void;
}) => (
  <CardContent className="w-full min-w-full space-y-2">
    <CardHeader className="mb-4 px-0">
      <CardTitle className="text-lg">Login</CardTitle>
      <CardDescription>
        Insira seu email e senha para acessar a plataforma!
      </CardDescription>
    </CardHeader>
    <SignInForm />
    <Button variant="outline" className="w-full" onClick={changeAuthPage}>
      Realizar cadastro
    </Button>
    <SignInCardFooter />
  </CardContent>
);
