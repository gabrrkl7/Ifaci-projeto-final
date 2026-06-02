"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CreateSensorDataRequest, SensorData, SensorDataHistoryResponse } from "@/types/sensor-data";

const sensorDataKey = ["sensor-data"] as const;

export function useSensorHistory(sensorId: string, page: number, pageSize: number) {
  return useQuery({
    queryKey: [...sensorDataKey, sensorId, page, pageSize],
    enabled: Boolean(sensorId),
    queryFn: async () => {
      const { data } = await apiClient.get<SensorDataHistoryResponse>(
        `/api/sensors/${sensorId}/SensorData/history?page=${page}&pageSize=${pageSize}`
      );
      return data;
    },
  });
}

export function useAddSensorData(sensorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSensorDataRequest) => {
      const { data } = await apiClient.post<SensorData>(`/api/sensors/${sensorId}/SensorData/data`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...sensorDataKey, sensorId] });
    },
  });
}
