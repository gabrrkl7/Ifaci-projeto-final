"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/auth/auth-context";
import type { AuthResponse, LoginRequest } from "@/types/auth";

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const { data } = await apiClient.post<AuthResponse>("/api/Auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      signIn(data);
    },
  });
}
