"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CreateDeviceRequest, Device, UpdateDeviceRequest } from "@/types/devices";

const devicesKey = ["devices"] as const;

export function useDevices() {
  return useQuery({
    queryKey: devicesKey,
    queryFn: async () => {
      const { data } = await apiClient.get<Device[]>("/api/Devices");
      return data;
    },
  });
}

export function useDevice(id: string) {
  return useQuery({
    queryKey: [...devicesKey, id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await apiClient.get<Device>(`/api/Devices/${id}`);
      return data;
    },
  });
}

export function useCreateDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDeviceRequest) => {
      const { data } = await apiClient.post<Device>("/api/Devices", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: devicesKey });
    },
  });
}

export function useUpdateDevice(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateDeviceRequest) => {
      const { data } = await apiClient.put<Device>(`/api/Devices/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: devicesKey });
      queryClient.invalidateQueries({ queryKey: [...devicesKey, id] });
    },
  });
}

export function useDeleteDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/Devices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: devicesKey });
    },
  });
}
