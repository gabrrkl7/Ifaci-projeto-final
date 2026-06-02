"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Actuator, CreateActuatorRequest, UpdateActuatorRequest } from "@/types/actuators";

const actuatorsKey = ["actuators"] as const;

export function useActuatorsByDevice(deviceId: string) {
  return useQuery({
    queryKey: [...actuatorsKey, "device", deviceId],
    enabled: Boolean(deviceId),
    queryFn: async () => {
      const { data } = await apiClient.get<Actuator[]>(`/api/devices/${deviceId}/Actuators`);
      return data;
    },
  });
}

export function useCreateActuator(deviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateActuatorRequest) => {
      const { data } = await apiClient.post<Actuator>(`/api/devices/${deviceId}/Actuators`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...actuatorsKey, "device", deviceId] });
    },
  });
}

export function useUpdateActuator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateActuatorRequest }) => {
      const { data } = await apiClient.put<Actuator>(`/api/Actuator/${id}`, payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [...actuatorsKey, "device", data.deviceId] });
    },
  });
}
