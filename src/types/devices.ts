export type DeviceProtocol = "OPC_UA" | "MODBUS" | "MQTT" | "HTTP";
export type DeviceStatus = "ONLINE" | "OFFLINE" | "INACTIVE";

export type Device = {
  id: string;
  name: string;
  description: string | null;
  serialNumber: string | null;
  protocol: DeviceProtocol;
  ipAddress: string | null;
  port: number | null;
  status: DeviceStatus;
  requiresAuthorization: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateDeviceRequest = {
  name: string;
  description?: string;
  serialNumber?: string;
  protocol: DeviceProtocol;
  ipAddress?: string;
  port: number;
  requiresAuthorization: boolean;
};

export type UpdateDeviceRequest = CreateDeviceRequest & {
  status: DeviceStatus;
};
