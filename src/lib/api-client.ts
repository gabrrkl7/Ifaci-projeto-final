import axios, { AxiosError } from "axios";
import { getToken } from "@/lib/auth-storage";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function parseErrorMessage(error: AxiosError) {
  const data = error.response?.data;

  if (typeof data === "string") return data;

  if (data && typeof data === "object") {
    const maybeMessage = (data as { message?: string }).message;
    if (maybeMessage) return maybeMessage;

    const maybeTitle = (data as { title?: string }).title;
    if (maybeTitle) return maybeTitle;

    const maybeErrors = (data as { errors?: Record<string, string[]> }).errors;
    if (maybeErrors) {
      const firstError = Object.values(maybeErrors)[0]?.[0];
      if (firstError) return firstError;
    }
  }

  if (error.response?.status === 401) return "Sessão inválida. Faça login novamente.";
  if (error.response?.status === 404) return "Registro não encontrado.";
  if (error.response?.status === 400) return "Dados inválidos. Revise os campos e tente novamente.";

  return "Falha na comunicação com a API.";
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = parseErrorMessage(error);
    return Promise.reject(new ApiError(message, error.response?.status));
  }
);
