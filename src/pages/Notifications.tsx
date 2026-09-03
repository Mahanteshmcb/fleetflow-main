import React, { useMemo, useState } from "react";
import { AlertTriangle, Wrench, FileText, Package, CheckCircle2 } from "lucide-react";
import { Card } from "../components/common/Card";
import { cn } from "../utils/cn";
import { mockNotifications } from "../data/notifications";

const filters = ["All", "Critical", "Maintenance", "Documents", "Inventory"] as const;

const categoryIcon: Record<string, React.ReactNode> = {
  Critical: <AlertTriangle size={16} className="text-critical" />,
  Maintenance: <Wrench size={16} className="text-warning" />,
  Documents: <FileText size={16} className="text-brand-600" />,
  Inventory: <Package size={16} className="text-navy-600" />,
  Success: <CheckCircle2 size={16} className="text-healthy" />,
};

const categoryBg: Record<string, string> = {
  Critical: "bg-critical-bg",
  Maintenance: "bg-warning-bg",
  Documents: "bg-brand-50",
  Inventory: "bg-navy-900/5",
  Success: "bg-healthy-bg",
};

export default function Notifications() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return mockNotifications;
    return mockNotifications.filter((n) => n.category === active);
  }, [active]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Notifications</h1>
        <p className="mt-1 text-[14px] text-navy-500">Stay on top of fleet alerts and updates.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
              active === f ? "border-brand-500 bg-brand-50 text-brand-700" : "border-navy-900/10 bg-white text-navy-600 hover:bg-surface"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="divide-y divide-navy-900/6">
        {filtered.length === 0 && <div className="p-8 text-center text-[14px] text-navy-500">No notifications in this category.</div>}
        {filtered.map((n) => (
          <div key={n.id} className={cn("flex items-start gap-3 p-4", !n.read && "bg-brand-50/30")}>
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", categoryBg[n.category])}>
              {categoryIcon[n.category]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[14px] font-semibold text-navy-900">{n.title}</p>
                <span className="shrink-0 text-[12px] text-navy-400">{n.timeAgo}</span>
              </div>
              {n.vehicleRegistration && <p className="text-[12px] font-medium text-brand-600">{n.vehicleRegistration}</p>}
              <p className="mt-0.5 text-[13px] text-navy-500">{n.message}</p>
            </div>
            {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
          </div>
        ))}
      </Card>
    </div>
  );
}
