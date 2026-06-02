"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRegister } from "@/hooks/auth/use-register";
import { ApiError } from "@/lib/api-client";
import { registerSchema, type RegisterFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerMutation.mutateAsync(values);
      toast.success("Usuário criado com sucesso. Faça login para continuar.");
      router.push("/login");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Falha no cadastro");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input label="Nome" type="text" {...register("name")} error={errors.name?.message} />
      <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message} />
      <Input label="Senha" type="password" {...register("password")} error={errors.password?.message} />
      <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
        Criar conta
      </Button>
      <p className="text-sm text-slate-400 text-center">
        Já tem acesso?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
