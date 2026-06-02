export type SensorData = {
  id: string;
  deviceId: string;
  sensorId: string;
  value: number;
  timestamp: string;
};

export type SensorDataHistoryResponse = {
  items: SensorData[];
  page: number;
  pageSize: number;
  total: number;
};

export type CreateSensorDataRequest = {
  value: number;
};
