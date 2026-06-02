"use client";

import { use } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import type { Actuator } from "@/types/actuators";
import { ApiError } from "@/lib/api-client";
import { useDevice } from "@/hooks/devices/use-devices";
import { useSensorsByDevice, useCreateSensor } from "@/hooks/sensors/use-sensors";
import { useActuatorsByDevice, useCreateActuator, useUpdateActuator } from "@/hooks/actuators/use-actuators";
import type { ActuatorCreateFormValues, ActuatorUpdateFormValues, SensorCreateFormValues } from "@/lib/validators";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Card, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { SensorForm } from "@/components/forms/sensor-form";
import { ActuatorForm } from "@/components/forms/actuator-form";
import { Button } from "@/components/ui/button";

export default function DeviceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const deviceQuery = useDevice(id);
  const sensorsQuery = useSensorsByDevice(id);
  const actuatorsQuery = useActuatorsByDevice(id);

  const createSensorMutation = useCreateSensor(id);
  const createActuatorMutation = useCreateActuator(id);
  const updateActuatorMutation = useUpdateActuator();

  async function handleCreateSensor(values: SensorCreateFormValues) {
    try {
      await createSensorMutation.mutateAsync(values);
      toast.success("Sensor criado");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao criar sensor");
    }
  }

  async function handleCreateActuator(values: ActuatorCreateFormValues) {
    try {
      await createActuatorMutation.mutateAsync(values);
      toast.success("Atuador criado");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao criar atuador");
    }
  }

  async function handleQuickActuatorUpdate(actuator: Actuator) {
    const input = window.prompt("Novo valor atual do atuador", String(actuator.currentValue ?? 0));
    if (input === null) return;

    const value = Number(input);
    if (!Number.isFinite(value)) {
      toast.error("Valor inválido");
      return;
    }

    const payload: ActuatorUpdateFormValues = {
      name: actuator.name,
      type: actuator.type ?? "",
      signalType: actuator.signalType,
      currentValue: value,
    };

    try {
      await updateActuatorMutation.mutateAsync({ id: actuator.id, payload });
      toast.success("Atuador atualizado");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao atualizar atuador");
    }
  }

  return (
    <ProtectedPage>
      {deviceQuery.isLoading ? (
        <Spinner label="Carregando detalhes do device..." />
      ) : deviceQuery.isError || !deviceQuery.data ? (
        <p className="text-danger">{deviceQuery.error instanceof ApiError ? deviceQuery.error.message : "Device não encontrado"}</p>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardTitle>{deviceQuery.data.name}</CardTitle>
            <div className="mt-3 text-sm text-slate-300 space-y-1">
              <p>Status: {deviceQuery.data.status}</p>
              <p>Protocolo: {deviceQuery.data.protocol}</p>
              <p>IP: {deviceQuery.data.ipAddress ?? "-"}</p>
              <p>Porta: {deviceQuery.data.port ?? "-"}</p>
            </div>
            <Link href={`/devices/${id}/edit`} className="inline-block mt-4 text-accent hover:underline text-sm">
              Editar device
            </Link>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="space-y-4">
              <CardTitle>Sensores</CardTitle>
              <SensorForm onSubmit={handleCreateSensor} isSubmitting={createSensorMutation.isPending} />
              {sensorsQuery.isLoading ? (
                <Spinner label="Carregando sensores..." />
              ) : sensorsQuery.data?.length ? (
                <div className="space-y-2">
                  {sensorsQuery.data.map((sensor) => (
                    <div key={sensor.id} className="rounded-md border border-border p-3 text-sm flex justify-between items-center">
                      <div>
                        <p className="font-medium">{sensor.name}</p>
                        <p className="text-slate-400">{sensor.type} • {sensor.currentValue ?? "-"} {sensor.unit ?? ""}</p>
                      </div>
                      <Link className="text-accent hover:underline" href={`/sensors/${sensor.id}/history`}>
                        Histórico
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState title="Sem sensores" description="Cadastre o primeiro sensor deste device." />
              )}
            </Card>

            <Card className="space-y-4">
              <CardTitle>Atuadores</CardTitle>
              <ActuatorForm mode="create" onSubmit={handleCreateActuator} isSubmitting={createActuatorMutation.isPending} />
              {actuatorsQuery.isLoading ? (
                <Spinner label="Carregando atuadores..." />
              ) : actuatorsQuery.data?.length ? (
                <div className="space-y-2">
                  {actuatorsQuery.data.map((actuator) => (
                    <div key={actuator.id} className="rounded-md border border-border p-3 text-sm flex justify-between items-center gap-3">
                      <div>
                        <p className="font-medium">{actuator.name}</p>
                        <p className="text-slate-400">
                          {actuator.signalType} • Atual: {actuator.currentValue ?? "-"}
                        </p>
                      </div>
                      <Button variant="secondary" onClick={() => handleQuickActuatorUpdate(actuator)}>
                        Atualizar
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState title="Sem atuadores" description="Cadastre o primeiro atuador deste device." />
              )}
            </Card>
          </div>
        </div>
      )}
    </ProtectedPage>
  );
}
