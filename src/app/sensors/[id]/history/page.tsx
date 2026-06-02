"use client";

import { use, useState } from "react";
import { toast } from "react-hot-toast";
import { ApiError } from "@/lib/api-client";
import { useAddSensorData, useSensorHistory } from "@/hooks/sensor-data/use-sensor-data";
import type { SensorDataFormValues } from "@/lib/validators";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Card, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { SensorDataForm } from "@/components/forms/sensor-data-form";
import { SensorDataTable } from "@/components/tables/sensor-data-table";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 50;

export default function SensorHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState(1);
  const historyQuery = useSensorHistory(id, page, PAGE_SIZE);
  const addDataMutation = useAddSensorData(id);

  async function handleAddData(values: SensorDataFormValues) {
    try {
      await addDataMutation.mutateAsync(values);
      toast.success("Dado inserido");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Erro ao inserir dado");
    }
  }

  return (
    <ProtectedPage>
      {historyQuery.isLoading ? (
        <Spinner label="Carregando histórico..." />
      ) : historyQuery.isError || !historyQuery.data ? (
        <p className="text-danger">{historyQuery.error instanceof ApiError ? historyQuery.error.message : "Falha ao carregar histórico"}</p>
      ) : (
        <div className="space-y-6">
          <Card className="space-y-4">
            <CardTitle>Sensor {id}</CardTitle>
            <SensorDataForm onSubmit={handleAddData} isSubmitting={addDataMutation.isPending} />
          </Card>

          <Card className="space-y-4">
            <CardTitle>Histórico de Telemetria</CardTitle>
            <SensorDataTable items={historyQuery.data.items} />
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                Página {historyQuery.data.page} de {Math.max(1, Math.ceil(historyQuery.data.total / historyQuery.data.pageSize))} • Total: {historyQuery.data.total}
              </span>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
                  Anterior
                </Button>
                <Button
                  variant="secondary"
                  disabled={page >= Math.max(1, Math.ceil(historyQuery.data.total / historyQuery.data.pageSize))}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </ProtectedPage>
  );
}
