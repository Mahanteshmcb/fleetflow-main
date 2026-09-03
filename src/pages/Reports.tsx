import React from "react";
import { HeartPulse, Wrench, CircleDot, IndianRupee, ShieldCheck, Eye, Download } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { useAppState } from "../context/AppStateContext";

const reports = [
  { id: "r1", name: "Fleet Health Report", description: "Overall health and status of every vehicle in your fleet.", icon: HeartPulse },
  { id: "r2", name: "Maintenance Report", description: "Upcoming, overdue and completed maintenance across the fleet.", icon: Wrench },
  { id: "r3", name: "Tyre Report", description: "Tyre condition, wear and replacement schedule.", icon: CircleDot },
  { id: "r4", name: "Cost Report", description: "Maintenance and operating costs by vehicle and period.", icon: IndianRupee },
  { id: "r5", name: "Compliance Report", description: "Document and regulatory compliance status.", icon: ShieldCheck },
];

export default function Reports() {
  const { showToast } = useAppState();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Reports</h1>
        <p className="mt-1 text-[14px] text-navy-500">Generate and export fleet reports.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.id} className="flex flex-col p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <r.icon size={18} />
            </div>
            <h3 className="font-semibold text-navy-900">{r.name}</h3>
            <p className="mt-1 flex-1 text-[13px] text-navy-500">{r.description}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-navy-900/6 pt-3">
              <Button size="sm" variant="secondary" icon={<Eye size={14} />} onClick={() => showToast(`Opening ${r.name}`, "info")}>
                View Report
              </Button>
              <Button size="sm" variant="ghost" icon={<Download size={14} />} onClick={() => showToast(`Downloading ${r.name}`, "info")}>
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
