import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Tyre as TyreType } from "../../types/tyre";
import { cn } from "../../utils/cn";

const conditionRing: Record<string, string> = {
  Healthy: "ring-healthy shadow-[0_0_0_3px_rgba(31,157,85,0.18)]",
  Warning: "ring-warning shadow-[0_0_0_3px_rgba(217,123,11,0.18)]",
  Critical: "ring-critical shadow-[0_0_0_3px_rgba(214,54,46,0.2)]",
};

export function Tyre({
  tyre,
  selected,
  dimmed,
  onClick,
  disabled,
}: {
  tyre: TyreType;
  selected: boolean;
  dimmed: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: tyre.id,
    data: { positionId: tyre.positionId },
    disabled,
  });

  const style: React.CSSProperties = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : {};

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: 0, top: 0, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={onClick}
        aria-label={`Tyre ${tyre.id}, ${tyre.positionName}, condition ${tyre.condition}. Press to view details, drag to move.`}
        className={cn(
          "group relative flex h-14 w-14 touch-none select-none items-center justify-center rounded-full border-4 border-navy-900 bg-navy-800 transition-transform duration-150 sm:h-16 sm:w-16",
          "ring-2 ring-offset-2",
          conditionRing[tyre.condition],
          selected && "ring-4 ring-brand-500 shadow-[0_0_0_5px_rgba(53,98,224,0.25)]",
          dimmed && "opacity-25",
          isDragging && "scale-110 opacity-60 shadow-pop",
          !isDragging && "hover:scale-105"
        )}
      >
        <div className="flex h-8 w-8 flex-col items-center justify-center rounded-full bg-navy-600 text-[10px] font-bold leading-tight text-white sm:h-9 sm:w-9">
          {tyre.id}
        </div>
      </button>

      {hovered && !isDragging && (
        <div className="pointer-events-none absolute left-1/2 top-full z-[60] mt-2 w-48 -translate-x-1/2 rounded-lg border border-navy-900/10 bg-white p-3 text-left shadow-pop">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-navy-900">{tyre.id}</span>
            <span className="text-[11px] text-navy-500">{tyre.positionName}</span>
          </div>
          <div className="text-[12px] text-navy-700">{tyre.brand} {tyre.model}</div>
          <div className="text-[12px] text-navy-500">{tyre.size}</div>
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
            <div className="text-navy-500">Pressure</div>
            <div className="text-right font-medium text-navy-800">{tyre.pressure} PSI</div>
            <div className="text-navy-500">Tread</div>
            <div className="text-right font-medium text-navy-800">{tyre.treadDepth} mm</div>
            <div className="text-navy-500">Condition</div>
            <div
              className={cn(
                "text-right font-semibold",
                tyre.condition === "Healthy" && "text-healthy",
                tyre.condition === "Warning" && "text-warning",
                tyre.condition === "Critical" && "text-critical"
              )}
            >
              {tyre.condition}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
