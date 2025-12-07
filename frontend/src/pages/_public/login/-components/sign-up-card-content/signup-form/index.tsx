import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbLoader2 } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  createUserSchema,
  type TCreateUser,
} from "@/core/schemas/create-user-schema";
import { SignUpFormFields } from "./signup-form-fields";

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (data: TCreateUser) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SignUpFormFields form={form} />
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? (
            <TbLoader2 className="size-5 animate-spin" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
};
