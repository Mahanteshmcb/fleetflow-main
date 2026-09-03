import React from "react";
import { Button } from "./Button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-navy-900/15 bg-white px-6 py-14 text-center">
      {icon && <div className="mb-1 text-navy-500/60">{icon}</div>}
      <h3 className="text-base font-semibold text-navy-900">{title}</h3>
      <p className="max-w-sm text-sm text-navy-500">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
