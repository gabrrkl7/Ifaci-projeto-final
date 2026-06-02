"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sensorDataSchema, type SensorDataFormValues } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SensorDataForm({ onSubmit, isSubmitting }: { onSubmit: (values: SensorDataFormValues) => void; isSubmitting?: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(sensorDataSchema),
    defaultValues: {
      value: 0,
    },
  });

  const submit = handleSubmit((values) => {
    onSubmit(values);
    reset({ value: 0 });
  });

  return (
    <form className="flex items-end gap-3" onSubmit={submit}>
      <div className="w-48">
        <Input label="Novo valor" type="number" step="0.01" {...register("value")} error={errors.value?.message} />
      </div>
      <Button type="submit" isLoading={isSubmitting}>
        Inserir dado
      </Button>
    </form>
  );
}
