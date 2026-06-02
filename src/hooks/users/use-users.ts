"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CreateUserRequest, UpdateUserRequest, User } from "@/types/users";

const usersKey = ["users"] as const;

export function useUsers() {
  return useQuery({
    queryKey: usersKey,
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>("/api/Users");
      return data;
    },
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: [...usersKey, id],
    enabled: Number.isFinite(id),
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/api/Users/${id}`);
      return data;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserRequest) => {
      const { data } = await apiClient.post<User>("/api/Users", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey });
    },
  });
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateUserRequest) => {
      const { data } = await apiClient.put<User>(`/api/Users/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey });
      queryClient.invalidateQueries({ queryKey: [...usersKey, id] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/Users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey });
    },
  });
}
