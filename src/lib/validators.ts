import { z } from "zod";

export const deviceProtocols = ["OPC_UA", "MODBUS", "MQTT", "HTTP"] as const;
export const deviceStatuses = ["ONLINE", "OFFLINE", "INACTIVE"] as const;
export const sensorTypes = ["Temperature", "Pressure", "Speed", "Status", "Other"] as const;
export const actuatorSignalTypes = ["Digital", "Analog", "PWM"] as const;

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});

export const deviceCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  serialNumber: z.string().optional(),
  protocol: z.enum(deviceProtocols),
  ipAddress: z.string().optional(),
  port: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value) && value >= 1 && value <= 65535, "Porta deve ser 1-65535"),
  requiresAuthorization: z.boolean(),
});

export const deviceUpdateSchema = deviceCreateSchema.extend({
  status: z.enum(deviceStatuses),
});

export const sensorCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(sensorTypes),
  unit: z.string().min(1, "Unidade é obrigatória"),
  minValue: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), "Valor mínimo inválido"),
  maxValue: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), "Valor máximo inválido"),
});

export const actuatorCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  signalType: z.enum(actuatorSignalTypes),
  minValue: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), "Valor mínimo inválido"),
  maxValue: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), "Valor máximo inválido"),
});

export const actuatorUpdateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  signalType: z.enum(actuatorSignalTypes),
  currentValue: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), "Valor atual inválido"),
});

export const sensorDataSchema = z.object({
  value: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), "Valor inválido"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type DeviceCreateFormValues = z.infer<typeof deviceCreateSchema>;
export type DeviceUpdateFormValues = z.infer<typeof deviceUpdateSchema>;
export type SensorCreateFormValues = z.infer<typeof sensorCreateSchema>;
export type ActuatorCreateFormValues = z.infer<typeof actuatorCreateSchema>;
export type ActuatorUpdateFormValues = z.infer<typeof actuatorUpdateSchema>;
export type SensorDataFormValues = z.infer<typeof sensorDataSchema>;
