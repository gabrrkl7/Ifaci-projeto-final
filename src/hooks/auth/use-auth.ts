"use client";

import { useAuth } from "@/hooks/auth/auth-context";

export function useAuthSession() {
  return useAuth();
}
