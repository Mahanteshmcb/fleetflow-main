import React from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card } from "../common/Card";
import { Vehicle } from "../../types/vehicle";
import { cn } from "../../utils/cn";

const statusStyles = {
  Valid: { icon: CheckCircle2, className: "text-healthy" },
  "Expiring Soon": { icon: AlertTriangle, className: "text-warning" },
  Expired: { icon: XCircle, className: "text-critical" },
};

export function ComplianceCards({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-[15px] font-semibold text-navy-900">Compliance</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {vehicle.compliance.map((c) => {
          const s = statusStyles[c.status];
          const Icon = s.icon;
          return (
            <div key={c.label} className="rounded-lg border border-navy-900/8 p-3">
              <div className="mb-1.5 text-[13px] font-semibold text-navy-900">{c.label}</div>
              <div className={cn("flex items-center gap-1.5 text-xs font-medium", s.className)}>
                <Icon size={13} />
                {c.status}
              </div>
              {c.status !== "Expired" && c.daysRemaining < 999 && (
                <div className="mt-1 text-[11px] text-navy-500">Expires in {c.daysRemaining} days</div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
