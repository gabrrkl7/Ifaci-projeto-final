"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ApiError } from "@/lib/api-client";
import { useCreateDevice } from "@/hooks/devices/use-devices";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Card, CardTitle } from "@/components/ui/card";
import { DeviceForm } from "@/components/forms/device-form";
import type { DeviceCreateFormValues } from "@/lib/validators";

export default function NewDevicePage() {
  const router = useRouter();
  const createMutation = useCreateDevice();

  async function handleSubmit(values: DeviceCreateFormValues) {
    try {
      const created = await createMutation.mutateAsync(values);
      toast.success("Device criado com sucesso");
      router.push(`/devices/${created.id}`);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao criar device");
    }
  }

  return (
    <ProtectedPage>
      <Card className="space-y-4">
        <CardTitle>Novo Device</CardTitle>
        <DeviceForm mode="create" onSubmit={(values) => handleSubmit(values as DeviceCreateFormValues)} isSubmitting={createMutation.isPending} />
      </Card>
    </ProtectedPage>
  );
}
