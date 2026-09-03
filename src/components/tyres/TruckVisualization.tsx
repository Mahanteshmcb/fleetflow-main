import React, { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw, RefreshCw } from "lucide-react";
import { TruckChassis } from "./TruckChassis";
import { TyrePosition } from "./TyrePosition";
import { RotationModeBanner } from "./RotationModeBanner";
import { TYRE_SLOTS } from "../../data/tyreSlots";
import { useAppState } from "../../context/AppStateContext";
import { cn } from "../../utils/cn";
import { Button } from "../common/Button";

export function TruckVisualization() {
  const {
    selectedVehicle,
    getTyresForVehicle,
    getLayoutForVehicle,
    openTyreDrawer,
    selectedTyreId,
    requestMove,
    rotationMode,
    rotationDraftLayout,
    enterRotationMode,
    cancelRotationMode,
    saveRotationMode,
    rotationMoveTyre,
    highlightedAxle,
    setHighlightedAxle,
  } = useAppState();

  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  if (!selectedVehicle) return null;

  const tyres = getTyresForVehicle(selectedVehicle.id);
  const committedLayout = getLayoutForVehicle(selectedVehicle.id);
  const layout = rotationMode && rotationDraftLayout ? rotationDraftLayout : committedLayout;

  const tyresById = Object.fromEntries(tyres.map((t) => [t.id, t]));

  function handleDragStart(e: DragStartEvent) {
    setActiveDragId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveDragId(null);
    const { active, over } = e;
    if (!over) return;
    const sourcePositionId = (active.data.current as any)?.positionId as string;
    const targetPositionId = String(over.id);
    if (!sourcePositionId || sourcePositionId === targetPositionId) return;

    if (rotationMode) {
      rotationMoveTyre(sourcePositionId, targetPositionId);
    } else if (selectedVehicle) {
      requestMove(selectedVehicle.id, sourcePositionId, targetPositionId);
    }
  }

  const activeTyre = activeDragId ? tyresById[activeDragId] : null;

  return (
    <div className={cn(fullscreen && "fixed inset-0 z-[90] bg-white p-4 sm:p-8")}>
      {rotationMode && <RotationModeBanner onCancel={cancelRotationMode} onSave={saveRotationMode} />}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg border border-navy-900/10 bg-white p-1">
          <IconBtn label="Zoom out" onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.1).toFixed(2))))}>
            <ZoomOut size={16} />
          </IconBtn>
          <span className="w-10 text-center text-xs font-medium text-navy-600">{Math.round(zoom * 100)}%</span>
          <IconBtn label="Zoom in" onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.1).toFixed(2))))}>
            <ZoomIn size={16} />
          </IconBtn>
        </div>
        <Button variant="secondary" size="sm" icon={<RotateCcw size={14} />} onClick={() => { setZoom(1); setHighlightedAxle(null); }}>
          Reset View
        </Button>
        <Button variant="secondary" size="sm" icon={fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />} onClick={() => setFullscreen((v) => !v)}>
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>
        {!rotationMode && (
          <Button variant="primary" size="sm" icon={<RefreshCw size={14} />} onClick={enterRotationMode} className="ml-auto">
            Rotate Tyres
          </Button>
        )}

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
          {[1, 2, 3, 4].map((axle) => (
            <button
              key={axle}
              onClick={() => setHighlightedAxle(highlightedAxle === axle ? null : axle)}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                highlightedAxle === axle
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-navy-900/10 bg-white text-navy-600 hover:bg-surface"
              )}
            >
              Axle {axle}
            </button>
          ))}
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="overflow-auto rounded-xl2 border border-navy-900/8 bg-surface/50 p-4">
          <div
            className="relative mx-auto aspect-[320/900] w-full max-w-[360px] origin-top transition-transform duration-150"
            style={{ transform: `scale(${zoom})` }}
          >
            <TruckChassis />
            {TYRE_SLOTS.map((slot) => {
              const tyreId = layout[slot.positionId];
              const tyre = tyreId ? tyresById[tyreId] : undefined;
              const dimmed = highlightedAxle !== null && slot.axle !== highlightedAxle;
              return (
                <TyrePosition
                  key={slot.positionId}
                  slot={slot}
                  tyre={tyre}
                  selectedTyreId={selectedTyreId}
                  dimmed={dimmed}
                  onTyreClick={(id) => !rotationMode && openTyreDrawer(id)}
                  isRotationMode={rotationMode}
                />
              );
            })}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTyre ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-brand-500 bg-navy-800 opacity-90 shadow-pop">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-600 text-[10px] font-bold text-white">
                {activeTyre.id}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <p className="mt-3 text-center text-xs text-navy-500">
        Drag any tyre onto another position to move or swap it. Click a tyre to view its details.
      </p>
    </div>
  );
}

function IconBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} title={label} className="rounded-md p-1.5 text-navy-600 hover:bg-surface">
      {children}
    </button>
  );
}
