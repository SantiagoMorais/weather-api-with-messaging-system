import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  authenticateUserSchema,
  type TAuthenticateUser,
} from "@/core/schemas/authenticate-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormFields } from "./auth-form-fields";
import { TbLoader2 } from "react-icons/tb";

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<TAuthenticateUser>({
    resolver: zodResolver(authenticateUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TAuthenticateUser) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AuthFormFields form={form} />
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? <TbLoader2 className="size-5 animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};
