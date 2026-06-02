"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CreateSensorRequest, Sensor } from "@/types/sensors";

const sensorsKey = ["sensors"] as const;

export function useSensorsByDevice(deviceId: string) {
  return useQuery({
    queryKey: [...sensorsKey, "device", deviceId],
    enabled: Boolean(deviceId),
    queryFn: async () => {
      const { data } = await apiClient.get<Sensor[]>(`/api/devices/${deviceId}/Sensors`);
      return data;
    },
  });
}

export function useCreateSensor(deviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSensorRequest) => {
      const { data } = await apiClient.post<Sensor>(`/api/devices/${deviceId}/Sensors`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...sensorsKey, "device", deviceId] });
    },
  });
}
