"use client";

import Link from "next/link";
import type { Device } from "@/types/devices";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export function DevicesTable({ devices, onDelete, isDeleting }: { devices: Device[]; onDelete: (id: string) => void; isDeleting?: boolean }) {
  if (!devices.length) {
    return <EmptyState title="Nenhum dispositivo cadastrado" description="Crie um novo device para começar a monitorar sensores." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-surface-muted text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Nome</th>
            <th className="px-4 py-3 text-left">Protocolo</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">IP</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="border-t border-border">
              <td className="px-4 py-3">{device.name}</td>
              <td className="px-4 py-3">{device.protocol}</td>
              <td className="px-4 py-3">{device.status}</td>
              <td className="px-4 py-3">{device.ipAddress ?? "-"}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link href={`/devices/${device.id}`} className="text-accent hover:underline">
                    Ver
                  </Link>
                  <Link href={`/devices/${device.id}/edit`} className="text-slate-300 hover:underline">
                    Editar
                  </Link>
                  <Button
                    variant="danger"
                    className="h-8 px-2 text-xs"
                    isLoading={isDeleting}
                    onClick={() => onDelete(device.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
