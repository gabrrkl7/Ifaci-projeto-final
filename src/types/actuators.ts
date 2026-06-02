export type ActuatorSignalType = "Digital" | "Analog" | "PWM";

export type Actuator = {
  id: string;
  deviceId: string;
  name: string;
  type: string | null;
  signalType: ActuatorSignalType;
  currentValue: number | null;
  minValue: number | null;
  maxValue: number | null;
};

export type CreateActuatorRequest = {
  name: string;
  type: string;
  signalType: ActuatorSignalType;
  minValue: number;
  maxValue: number;
};

export type UpdateActuatorRequest = {
  name: string;
  type: string;
  signalType: ActuatorSignalType;
  currentValue: number;
};
