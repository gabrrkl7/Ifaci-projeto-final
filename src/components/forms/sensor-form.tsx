"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sensorCreateSchema, sensorTypes, type SensorCreateFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function SensorForm({ onSubmit, isSubmitting }: { onSubmit: (values: SensorCreateFormValues) => void; isSubmitting?: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sensorCreateSchema),
    defaultValues: {
      name: "",
      type: "Temperature",
      unit: "°C",
      minValue: 0,
      maxValue: 100,
    },
  });

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nome" {...register("name")} error={errors.name?.message} />
      <Select
        label="Tipo"
        {...register("type")}
        options={sensorTypes.map((type) => ({ value: type, label: type }))}
        error={errors.type?.message}
      />
      <Input label="Unidade" {...register("unit")} error={errors.unit?.message} />
      <Input label="Mínimo" type="number" {...register("minValue")} error={errors.minValue?.message} />
      <Input label="Máximo" type="number" {...register("maxValue")} error={errors.maxValue?.message} />
      <Button type="submit" isLoading={isSubmitting}>
        Criar sensor
      </Button>
    </form>
  );
}
