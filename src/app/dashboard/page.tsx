"use client";

import { toast } from "react-hot-toast";
import { ApiError } from "@/lib/api-client";
import { useDeleteDevice, useDevices } from "@/hooks/devices/use-devices";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Card, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { DevicesTable } from "@/components/tables/devices-table";

export default function DashboardPage() {
  const devicesQuery = useDevices();
  const deleteMutation = useDeleteDevice();

  const devices = devicesQuery.data ?? [];

  const total = devices.length;
  const online = devices.filter((d) => d.status === "ONLINE").length;
  const offline = devices.filter((d) => d.status === "OFFLINE").length;
  const inactive = devices.filter((d) => d.status === "INACTIVE").length;

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Confirma exclusão deste device?");
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Device removido");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao remover device");
    }
  }

  return (
    <ProtectedPage>
      {devicesQuery.isLoading ? (
        <Spinner label="Carregando dashboard..." />
      ) : devicesQuery.isError ? (
        <p className="text-danger">{(devicesQuery.error as ApiError).message}</p>
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <p className="text-xs text-slate-400">Total devices</p>
              <p className="text-2xl font-semibold mt-1">{total}</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-400">ONLINE</p>
              <p className="text-2xl font-semibold mt-1">{online}</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-400">OFFLINE</p>
              <p className="text-2xl font-semibold mt-1">{offline}</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-400">INACTIVE</p>
              <p className="text-2xl font-semibold mt-1">{inactive}</p>
            </Card>
          </section>

          <section className="space-y-3">
            <CardTitle>Devices</CardTitle>
            <DevicesTable devices={devices} onDelete={handleDelete} isDeleting={deleteMutation.isPending} />
          </section>
        </div>
      )}
    </ProtectedPage>
  );
}
