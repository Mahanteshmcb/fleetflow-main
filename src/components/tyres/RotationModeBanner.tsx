import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../common/Button";

export function RotationModeBanner({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <RefreshCw size={16} className="shrink-0 text-brand-600" />
        <div>
          <span className="mr-2 inline-flex items-center rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-semibold text-white">
            Rotation Mode
          </span>
          <span className="text-[13px] text-brand-800">
            Rotate tyres by dragging them to new positions. Changes are temporary until you save.
          </span>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={onSave}>
          Save Rotation
        </Button>
      </div>
    </div>
  );
}
