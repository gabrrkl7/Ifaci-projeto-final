export type SensorType = "Temperature" | "Pressure" | "Speed" | "Status" | "Other";

export type Sensor = {
  id: string;
  deviceId: string;
  name: string;
  type: SensorType;
  unit: string | null;
  currentValue: number | null;
  minValue: number | null;
  maxValue: number | null;
  lastUpdate: string | null;
};

export type CreateSensorRequest = {
  name: string;
  type: SensorType;
  unit: string;
  minValue: number;
  maxValue: number;
};
