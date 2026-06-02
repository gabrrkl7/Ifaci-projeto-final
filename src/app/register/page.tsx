"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/hooks/auth/use-auth";
import { Card, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthSession();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md space-y-4">
        <div>
          <CardTitle>Criar usuário</CardTitle>
          <p className="text-sm text-slate-400 mt-1">Crie um acesso para operar a plataforma industrial.</p>
        </div>
        <RegisterForm />
        <p className="text-xs text-slate-500 text-center">Este cadastro usa o endpoint /api/Auth/register no backend.</p>
      </Card>
    </div>
  );
}
