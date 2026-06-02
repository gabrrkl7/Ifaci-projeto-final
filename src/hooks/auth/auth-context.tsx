"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AuthResponse } from "@/types/auth";
import { clearSession, getStoredUser, getToken, saveSession, type StoredUser } from "@/lib/auth-storage";

type AuthContextValue = {
  isAuthenticated: boolean;
  user: StoredUser | null;
  token: string | null;
  isBootstrapping: boolean;
  signIn: (payload: AuthResponse) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsBootstrapping(false);
  }, []);

  const signIn = useCallback((payload: AuthResponse) => {
    const sessionUser = { id: payload.id, name: payload.name, email: payload.email };
    saveSession(payload.token, sessionUser);
    setToken(payload.token);
    setUser(sessionUser);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(token),
      user,
      token,
      isBootstrapping,
      signIn,
      signOut,
    }),
    [isBootstrapping, signIn, signOut, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
