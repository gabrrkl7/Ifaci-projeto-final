"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ApiError } from "@/lib/api-client";
import { useDevice, useUpdateDevice } from "@/hooks/devices/use-devices";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Card, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { DeviceForm } from "@/components/forms/device-form";
import type { DeviceUpdateFormValues } from "@/lib/validators";

export default function EditDevicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const deviceQuery = useDevice(id);
  const updateMutation = useUpdateDevice(id);

  async function handleSubmit(values: DeviceUpdateFormValues) {
    try {
      await updateMutation.mutateAsync(values);
      toast.success("Device atualizado");
      router.push(`/devices/${id}`);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao atualizar");
    }
  }

  return (
    <ProtectedPage>
      {deviceQuery.isLoading ? (
        <Spinner label="Carregando device..." />
      ) : deviceQuery.isError || !deviceQuery.data ? (
        <p className="text-danger">{deviceQuery.error instanceof ApiError ? deviceQuery.error.message : "Device não encontrado"}</p>
      ) : (
        <Card className="space-y-4">
          <CardTitle>Editar Device</CardTitle>
          <DeviceForm
            mode="edit"
            initialData={deviceQuery.data}
            onSubmit={(values) => handleSubmit(values as DeviceUpdateFormValues)}
            isSubmitting={updateMutation.isPending}
          />
        </Card>
      )}
    </ProtectedPage>
  );
}
