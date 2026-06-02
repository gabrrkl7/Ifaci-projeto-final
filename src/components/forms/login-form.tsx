"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useLogin } from "@/hooks/auth/use-login";
import { ApiError } from "@/lib/api-client";
import { loginSchema, type LoginFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      toast.success("Login realizado com sucesso");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Falha no login");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message} />
      <Input label="Senha" type="password" {...register("password")} error={errors.password?.message} />
      <Button type="submit" className="w-full" isLoading={loginMutation.isPending}>
        Entrar
      </Button>
      <p className="text-sm text-slate-400 text-center">
        Não possui usuário?{" "}
        <Link href="/register" className="text-accent hover:underline">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
