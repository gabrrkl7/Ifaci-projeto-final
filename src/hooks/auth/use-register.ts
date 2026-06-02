"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { RegisterRequest } from "@/types/auth";

type RegisterResponse = {
  id: number;
  name: string;
  email: string;
};

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      const { data } = await apiClient.post<RegisterResponse>("/api/Auth/register", payload);
      return data;
    },
  });
}
