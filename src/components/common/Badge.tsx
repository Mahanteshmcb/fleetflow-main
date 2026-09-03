import React from "react";
import { cn } from "../../utils/cn";

type Tone = "healthy" | "warning" | "critical" | "neutral" | "brand";

const toneClasses: Record<Tone, string> = {
  healthy: "bg-healthy-bg text-healthy",
  warning: "bg-warning-bg text-warning",
  critical: "bg-critical-bg text-critical",
  neutral: "bg-navy-900/5 text-navy-700",
  brand: "bg-brand-50 text-brand-700",
};

export function Badge({ tone = "neutral", children, dot = false, className }: { tone?: Tone; children: React.ReactNode; dot?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", toneClasses[tone], className)}>
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", tone === "healthy" && "bg-healthy", tone === "warning" && "bg-warning", tone === "critical" && "bg-critical", tone === "neutral" && "bg-navy-500", tone === "brand" && "bg-brand-500")} />}
      {children}
    </span>
  );
}

export function healthTone(health: string): Tone {
  if (health === "Critical" || health === "Needs Inspection") return "critical";
  if (health === "Warning") return "warning";
  return "healthy";
}
