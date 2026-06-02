"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/hooks/auth/use-auth";
import { Card, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
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
          <CardTitle>Login</CardTitle>
          <p className="text-sm text-slate-400 mt-1">Acesse a console industrial com seu usuário.</p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
}
