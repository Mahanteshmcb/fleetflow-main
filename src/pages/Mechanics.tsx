import React from "react";
import { Wrench, CheckCircle2 } from "lucide-react";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { mockMechanics } from "../data/mechanics";

const statusTone: Record<string, "healthy" | "warning" | "critical" | "neutral" | "brand"> = {
  Open: "brand",
  "In Progress": "warning",
  "Waiting for Parts": "critical",
  Completed: "healthy",
};

export default function Mechanics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Mechanics</h1>
        <p className="mt-1 text-[14px] text-navy-500">Workshop staff and their current workload.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockMechanics.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Wrench size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900">{m.name}</h3>
                  <p className="text-[13px] text-navy-500">{m.specialty}</p>
                </div>
              </div>
              <Badge tone={statusTone[m.status]}>{m.status}</Badge>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-navy-900/6 pt-3 text-[13px]">
              <span className="text-navy-500">Open Jobs</span>
              <span className="font-semibold text-navy-900">{m.openJobs}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-1.5 text-navy-500"><CheckCircle2 size={13} /> Completed</span>
              <span className="font-semibold text-navy-900">{m.completedJobs}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
