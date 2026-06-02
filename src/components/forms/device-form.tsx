"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deviceProtocols, deviceStatuses, deviceCreateSchema, deviceUpdateSchema } from "@/lib/validators";
import type { Device } from "@/types/devices";
import type { DeviceCreateFormValues, DeviceUpdateFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type DeviceFormProps = {
  mode: "create" | "edit";
  initialData?: Device;
  isSubmitting?: boolean;
  onSubmit: (values: DeviceCreateFormValues | DeviceUpdateFormValues) => void;
};

export function DeviceForm({ mode, initialData, isSubmitting, onSubmit }: DeviceFormProps) {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(isEdit ? deviceUpdateSchema : deviceCreateSchema),
    defaultValues: (isEdit
      ? {
          name: initialData?.name ?? "",
          description: initialData?.description ?? "",
          serialNumber: initialData?.serialNumber ?? "",
          protocol: initialData?.protocol ?? "MQTT",
          ipAddress: initialData?.ipAddress ?? "",
          port: initialData?.port ?? 502,
          requiresAuthorization: initialData?.requiresAuthorization ?? false,
          status: initialData?.status ?? "OFFLINE",
        }
      : {
          name: "",
          description: "",
          serialNumber: "",
          protocol: "MQTT",
          ipAddress: "",
          port: 502,
          requiresAuthorization: false,
        }) as any,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Input label="Nome" {...register("name")} error={errors.name?.message as string | undefined} />
      <Input label="Descrição" {...register("description")} error={errors.description?.message as string | undefined} />
      <Input label="Serial Number" {...register("serialNumber")} error={errors.serialNumber?.message as string | undefined} />
      <Select
        label="Protocolo"
        {...register("protocol")}
        options={deviceProtocols.map((p) => ({ value: p, label: p }))}
        error={errors.protocol?.message as string | undefined}
      />
      <Input label="IP" {...register("ipAddress")} error={errors.ipAddress?.message as string | undefined} />
      <Input label="Porta" type="number" {...register("port")} error={errors.port?.message as string | undefined} />

      {isEdit && (
        <Select
          label="Status"
          {...register("status")}
          options={deviceStatuses.map((s) => ({ value: s, label: s }))}
          error={(errors as { status?: { message?: string } }).status?.message}
        />
      )}

      <label className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm md:col-span-2 h-10">
        <input
          type="checkbox"
          checked={watch("requiresAuthorization")}
          onChange={(event) => setValue("requiresAuthorization", event.target.checked)}
        />
        Requer autorização
      </label>

      <div className="md:col-span-2">
        <Button type="submit" isLoading={isSubmitting}>
          {isEdit ? "Salvar alterações" : "Cadastrar device"}
        </Button>
      </div>
    </form>
  );
}
