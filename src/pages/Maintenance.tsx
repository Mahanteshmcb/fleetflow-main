import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { mockMaintenance } from "../data/maintenance";
import { MaintenanceStatus } from "../types/maintenance";
import { cn } from "../utils/cn";

const TABS: { label: string; statuses: MaintenanceStatus[] }[] = [
  { label: "Upcoming", statuses: ["Upcoming"] },
  { label: "Overdue", statuses: ["Overdue", "Critical"] },
  { label: "Completed", statuses: ["Completed"] },
  { label: "All", statuses: ["Upcoming", "Overdue", "Critical", "Completed"] },
];

const statusTone: Record<MaintenanceStatus, "healthy" | "warning" | "critical" | "neutral"> = {
  Upcoming: "warning",
  Overdue: "critical",
  Critical: "critical",
  Completed: "healthy",
};

export default function Maintenance() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const records = mockMaintenance.filter((m) => TABS[tab].statuses.includes(m.status));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Maintenance</h1>
          <p className="mt-1 text-[14px] text-navy-500">Keep your fleet service-ready.</p>
        </div>
        <Button variant="secondary" icon={<History size={15} />} onClick={() => navigate("/maintenance/history")}>
          View History
        </Button>
      </div>

      <div className="flex w-fit gap-1 rounded-lg border border-navy-900/10 bg-white p-1">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={cn(
              "rounded-md px-4 py-1.5 text-[13px] font-medium transition-colors",
              tab === i ? "bg-brand-500 text-white" : "text-navy-600 hover:bg-surface"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {records.length === 0 ? (
        <EmptyState title="No maintenance records" description="There are no maintenance records in this category yet." actionLabel="Schedule Maintenance" onAction={() => {}} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {records.map((m) => (
            <Card key={m.id} className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="font-semibold text-navy-900">{m.task}</h3>
                <Badge tone={statusTone[m.status]}>{m.status}</Badge>
              </div>
              <p className="text-[13px] text-navy-600">{m.vehicleRegistration}</p>
              <p className="mt-1 text-[13px] font-medium text-navy-800">{m.dueLabel}</p>
              <div className="mt-3 border-t border-navy-900/6 pt-3 text-[12px] text-navy-500">
                {m.intervalType} · {m.schedule}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
