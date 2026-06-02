"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  actuatorCreateSchema,
  actuatorSignalTypes,
  actuatorUpdateSchema,
  type ActuatorCreateFormValues,
  type ActuatorUpdateFormValues,
} from "@/lib/validators";
import type { Actuator } from "@/types/actuators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Props =
  | {
      mode: "create";
      onSubmit: (values: ActuatorCreateFormValues) => void;
      isSubmitting?: boolean;
    }
  | {
      mode: "edit";
      initialData: Actuator;
      onSubmit: (values: ActuatorUpdateFormValues) => void;
      isSubmitting?: boolean;
    };

export function ActuatorForm(props: Props) {
  const isEdit = props.mode === "edit";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? actuatorUpdateSchema : actuatorCreateSchema),
    defaultValues: isEdit
      ? {
          name: props.initialData.name,
          type: props.initialData.type ?? "",
          signalType: props.initialData.signalType,
          currentValue: props.initialData.currentValue ?? 0,
        }
      : {
          name: "",
          type: "",
          signalType: "Digital",
          minValue: 0,
          maxValue: 100,
        },
  });

  return (
    <form className="grid gap-3" onSubmit={handleSubmit((values) => props.onSubmit(values as never))}>
      <Input label="Nome" {...register("name")} error={errors.name?.message as string | undefined} />
      <Input label="Tipo" {...register("type")} error={errors.type?.message as string | undefined} />
      <Select
        label="Signal Type"
        {...register("signalType")}
        options={actuatorSignalTypes.map((signal) => ({ value: signal, label: signal }))}
        error={errors.signalType?.message as string | undefined}
      />

      {isEdit ? (
        <Input
          label="Valor atual"
          type="number"
          {...register("currentValue")}
          error={(errors as { currentValue?: { message?: string } }).currentValue?.message}
        />
      ) : (
        <>
          <Input
            label="Mínimo"
            type="number"
            {...register("minValue")}
            error={(errors as { minValue?: { message?: string } }).minValue?.message}
          />
          <Input
            label="Máximo"
            type="number"
            {...register("maxValue")}
            error={(errors as { maxValue?: { message?: string } }).maxValue?.message}
          />
        </>
      )}

      <Button type="submit" isLoading={props.isSubmitting}>
        {isEdit ? "Atualizar atuador" : "Criar atuador"}
      </Button>
    </form>
  );
}
