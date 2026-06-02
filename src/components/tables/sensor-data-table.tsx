import type { SensorData } from "@/types/sensor-data";
import { EmptyState } from "@/components/ui/empty-state";

export function SensorDataTable({ items }: { items: SensorData[] }) {
  if (!items.length) {
    return <EmptyState title="Sem histórico" description="Ainda não existem dados de telemetria para este sensor." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-surface-muted text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Valor</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
            <th className="px-4 py-3 text-left">DeviceId</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-border">
              <td className="px-4 py-3">{item.value}</td>
              <td className="px-4 py-3">{new Date(item.timestamp).toLocaleString()}</td>
              <td className="px-4 py-3">{item.deviceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
