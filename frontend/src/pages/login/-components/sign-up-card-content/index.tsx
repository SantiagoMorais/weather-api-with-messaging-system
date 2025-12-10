import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "./signup-form";
import { Button } from "@/components/ui/button";

export const SignUpCardContent = ({
  changeAuthPage,
}: {
  changeAuthPage: () => void;
}) => (
  <CardContent className="w-full min-w-full space-y-2">
    <CardHeader className="mb-4 px-0">
      <CardTitle className="text-lg">Cadastre-se</CardTitle>
      <CardDescription>
        Insira seus dados para criar uma nova conta!
      </CardDescription>
    </CardHeader>
    <SignUpForm changeAuthPage={changeAuthPage} />
    <CardFooter className="px-0">
      <Button
        className="text-muted-foreground w-full text-sm"
        variant="outline"
        onClick={changeAuthPage}
      >
        Já possui uma conta? Faça login.
      </Button>
    </CardFooter>
  </CardContent>
);
