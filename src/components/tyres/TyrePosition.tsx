import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { TyreSlot, Tyre as TyreType } from "../../types/tyre";
import { Tyre } from "./Tyre";
import { cn } from "../../utils/cn";

export function TyrePosition({
  slot,
  tyre,
  selectedTyreId,
  dimmed,
  onTyreClick,
  isRotationMode,
}: {
  slot: TyreSlot;
  tyre: TyreType | undefined;
  selectedTyreId: string | null;
  dimmed: boolean;
  onTyreClick: (tyreId: string) => void;
  isRotationMode: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: slot.positionId, data: { positionId: slot.positionId } });

  const leftPct = (slot.x / 320) * 100;
  const topPct = (slot.y / 900) * 100;

  return (
    <div
      ref={setNodeRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
    >
      {/* Drop-target glow ring, shown while something is being dragged over this slot */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed transition-all",
          isOver ? "scale-110 border-brand-500 bg-brand-500/10" : "border-transparent",
          isRotationMode && !isOver && "border-brand-300/60"
        )}
      />
      {tyre ? (
        <Tyre tyre={tyre} selected={selectedTyreId === tyre.id} dimmed={dimmed} onClick={() => onTyreClick(tyre.id)} />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-navy-900/20 text-[10px] font-medium text-navy-400 sm:h-16 sm:w-16">
          Empty
        </div>
      )}
    </div>
  );
}
