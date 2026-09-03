import React from "react";
import { Card } from "../common/Card";
import { cn } from "../../utils/cn";

export function StatCard({
  icon,
  label,
  value,
  trend,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  tone?: "neutral" | "healthy" | "warning" | "critical" | "brand";
}) {
  const toneClasses = {
    neutral: "bg-navy-900/5 text-navy-700",
    healthy: "bg-healthy-bg text-healthy",
    warning: "bg-warning-bg text-warning",
    critical: "bg-critical-bg text-critical",
    brand: "bg-brand-50 text-brand-600",
  }[tone];

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneClasses)}>{icon}</div>
        {trend && <span className="text-xs font-medium text-navy-500">{trend}</span>}
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight text-navy-900">{value}</div>
      <div className="mt-1 text-[13px] text-navy-500">{label}</div>
    </Card>
  );
}
