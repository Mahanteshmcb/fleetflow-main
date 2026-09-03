import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Vehicle, HealthStatus } from "../types/vehicle";
import { Tyre, TyreLayout } from "../types/tyre";
import { TYRE_SLOTS } from "../data/tyreSlots";
import { generateTyreSet } from "../data/tyres";
import { mockVehicles } from "../data/vehicles";
import { useToast, ToastItem } from "../hooks/useToast";

export type Role = "Fleet Owner / Admin" | "Fleet Manager" | "Driver" | "Mechanic";

type VehicleTyreData = {
  tyres: Tyre[];
  layout: TyreLayout; // positionId -> tyreId
};

type SwapRequest = {
  vehicleId: string;
  sourcePositionId: string;
  targetPositionId: string;
} | null;

type UndoSnapshot = {
  vehicleId: string;
  layout: TyreLayout;
  tyres: Tyre[];
} | null;

type NewVehicleInput = {
  registration: string;
  manufacturer: string;
  model: string;
  vehicleType: string;
  capacity: string;
  manufacturingYear: string;
  chassisNumber: string;
  engineNumber: string;
  fuelType: string;
  odometer: string;
  purchaseDate: string;
  insuranceExpiry: string;
  fitnessExpiry: string;
  permitExpiry: string;
  pucExpiry: string;
  roadTaxExpiry: string;
  gpsDeviceId: string;
  gpsProvider: string;
};

type AppStateValue = {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  setSelectedVehicleId: (id: string) => void;
  selectedVehicle: Vehicle | undefined;

  tyreData: Record<string, VehicleTyreData>;
  getTyresForVehicle: (vehicleId: string) => Tyre[];
  getLayoutForVehicle: (vehicleId: string) => TyreLayout;

  // Tyre drawer
  selectedTyreId: string | null;
  isTyreDrawerOpen: boolean;
  openTyreDrawer: (tyreId: string) => void;
  closeTyreDrawer: () => void;
  updateTyre: (vehicleId: string, tyreId: string, patch: Partial<Tyre>) => void;

  // My vehicles drawer
  isMyVehiclesDrawerOpen: boolean;
  openMyVehiclesDrawer: () => void;
  closeMyVehiclesDrawer: () => void;

  // Add vehicle drawer
  isAddVehicleDrawerOpen: boolean;
  openAddVehicleDrawer: () => void;
  closeAddVehicleDrawer: () => void;
  addVehicle: (input: NewVehicleInput) => void;

  // Drag and drop / swap
  swapRequest: SwapRequest;
  requestMove: (vehicleId: string, sourcePositionId: string, targetPositionId: string) => void;
  confirmSwap: () => void;
  cancelSwap: () => void;

  // Undo
  undoAvailable: boolean;
  undoLastChange: () => void;

  // Rotation mode
  rotationMode: boolean;
  rotationDraftLayout: TyreLayout | null;
  enterRotationMode: () => void;
  cancelRotationMode: () => void;
  saveRotationMode: () => void;
  rotationMoveTyre: (sourcePositionId: string, targetPositionId: string) => void;

  // Axle filter
  highlightedAxle: number | null;
  setHighlightedAxle: (axle: number | null) => void;

  // Role
  role: Role;
  setRole: (role: Role) => void;

  // Issue reporting
  reportIssue: (vehicleId: string, description: string) => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, variant?: "success" | "warning" | "error" | "info", actionLabel?: string, onAction?: () => void) => string;
  dismissToast: (id: string) => void;
};

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

function buildInitialTyreData(vehicles: Vehicle[]): Record<string, VehicleTyreData> {
  const map: Record<string, VehicleTyreData> = {};
  vehicles.forEach((v, index) => {
    const { tyres, layout } = generateTyreSet(index + 1);
    map[v.id] = { tyres, layout };
  });
  return map;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(mockVehicles[0].id);
  const [tyreData, setTyreData] = useState<Record<string, VehicleTyreData>>(() => buildInitialTyreData(mockVehicles));

  const [selectedTyreId, setSelectedTyreId] = useState<string | null>(null);
  const [isTyreDrawerOpen, setIsTyreDrawerOpen] = useState(false);
  const [isMyVehiclesDrawerOpen, setIsMyVehiclesDrawerOpen] = useState(false);
  const [isAddVehicleDrawerOpen, setIsAddVehicleDrawerOpen] = useState(false);

  const [swapRequest, setSwapRequest] = useState<SwapRequest>(null);
  const [undoSnapshot, setUndoSnapshot] = useState<UndoSnapshot>(null);

  const [rotationMode, setRotationMode] = useState(false);
  const [rotationDraftLayout, setRotationDraftLayout] = useState<TyreLayout | null>(null);
  const [preRotationLayout, setPreRotationLayout] = useState<TyreLayout | null>(null);

  const [highlightedAxle, setHighlightedAxle] = useState<number | null>(null);
  const [role, setRole] = useState<Role>("Fleet Owner / Admin");

  const { toasts, showToast, dismissToast } = useToast();

  const selectedVehicle = useMemo(() => vehicles.find((v) => v.id === selectedVehicleId), [vehicles, selectedVehicleId]);

  const getTyresForVehicle = useCallback((vehicleId: string) => tyreData[vehicleId]?.tyres ?? [], [tyreData]);
  const getLayoutForVehicle = useCallback((vehicleId: string) => tyreData[vehicleId]?.layout ?? {}, [tyreData]);

  const openTyreDrawer = useCallback((tyreId: string) => {
    setSelectedTyreId(tyreId);
    setIsTyreDrawerOpen(true);
  }, []);
  const closeTyreDrawer = useCallback(() => setIsTyreDrawerOpen(false), []);

  const updateTyre = useCallback((vehicleId: string, tyreId: string, patch: Partial<Tyre>) => {
    setTyreData((prev) => {
      const entry = prev[vehicleId];
      if (!entry) return prev;
      const tyres = entry.tyres.map((t) => (t.id === tyreId ? { ...t, ...patch } : t));
      return { ...prev, [vehicleId]: { ...entry, tyres } };
    });
  }, []);

  const openMyVehiclesDrawer = useCallback(() => setIsMyVehiclesDrawerOpen(true), []);
  const closeMyVehiclesDrawer = useCallback(() => setIsMyVehiclesDrawerOpen(false), []);
  const openAddVehicleDrawer = useCallback(() => setIsAddVehicleDrawerOpen(true), []);
  const closeAddVehicleDrawer = useCallback(() => setIsAddVehicleDrawerOpen(false), []);

  const addVehicle = useCallback(
    (input: NewVehicleInput) => {
      const id = `vehicle-${Date.now()}`;
      const newVehicle: Vehicle = {
        id,
        registration: input.registration,
        manufacturer: input.manufacturer,
        model: input.model,
        vehicleType: input.vehicleType,
        capacity: input.capacity || "—",
        manufacturingYear: input.manufacturingYear || "—",
        chassisNumber: input.chassisNumber || "—",
        engineNumber: input.engineNumber || "—",
        fuelType: input.fuelType || "Diesel",
        odometer: Number(input.odometer) || 0,
        purchaseDate: input.purchaseDate || new Date().toISOString().slice(0, 10),
        health: "Healthy",
        nextMaintenance: { task: "General Inspection", due: "30 days", isOverdue: false },
        monthlyCost: 0,
        gpsDeviceId: input.gpsDeviceId,
        gpsProvider: input.gpsProvider,
        compliance: [
          { label: "Insurance", status: "Valid", expiryDate: input.insuranceExpiry || "—", daysRemaining: 300 },
          { label: "Fitness", status: "Valid", expiryDate: input.fitnessExpiry || "—", daysRemaining: 300 },
          { label: "PUC", status: "Valid", expiryDate: input.pucExpiry || "—", daysRemaining: 300 },
          { label: "Permit", status: "Valid", expiryDate: input.permitExpiry || "—", daysRemaining: 300 },
          { label: "Road Tax", status: "Valid", expiryDate: input.roadTaxExpiry || "—", daysRemaining: 300 },
        ],
      };

      setVehicles((prev) => [...prev, newVehicle]);
      setTyreData((prev) => {
        const seed = Object.keys(prev).length + 1;
        const { tyres, layout } = generateTyreSet(seed);
        return { ...prev, [id]: { tyres, layout } };
      });
      setIsAddVehicleDrawerOpen(false);
      showToast("Vehicle added successfully", "success");
    },
    [showToast]
  );

  // ---- Tyre position logic ----

  function applyPositionSwap(layout: TyreLayout, tyres: Tyre[], posA: string, posB: string): { layout: TyreLayout; tyres: Tyre[] } {
    const newLayout = { ...layout };
    const tyreAtA = layout[posA] ?? null;
    const tyreAtB = layout[posB] ?? null;

    if (tyreAtA) newLayout[posB] = tyreAtA; else delete newLayout[posB];
    if (tyreAtB) newLayout[posA] = tyreAtB; else delete newLayout[posA];

    const slotA = TYRE_SLOTS.find((s) => s.positionId === posA)!;
    const slotB = TYRE_SLOTS.find((s) => s.positionId === posB)!;

    const newTyres = tyres.map((t) => {
      if (t.id === tyreAtA) {
        return { ...t, positionId: slotB.positionId, positionName: slotB.positionName, axle: slotB.axle, side: slotB.side, type: slotB.type };
      }
      if (t.id === tyreAtB) {
        return { ...t, positionId: slotA.positionId, positionName: slotA.positionName, axle: slotA.axle, side: slotA.side, type: slotA.type };
      }
      return t;
    });

    return { layout: newLayout, tyres: newTyres };
  }

  const requestMove = useCallback(
    (vehicleId: string, sourcePositionId: string, targetPositionId: string) => {
      if (sourcePositionId === targetPositionId) return;
      const entry = tyreData[vehicleId];
      if (!entry) return;

      const targetOccupied = Boolean(entry.layout[targetPositionId]);

      if (targetOccupied) {
        setSwapRequest({ vehicleId, sourcePositionId, targetPositionId });
        return;
      }

      // Empty target — move immediately
      setUndoSnapshot({ vehicleId, layout: entry.layout, tyres: entry.tyres });
      const { layout, tyres } = applyPositionSwap(entry.layout, entry.tyres, sourcePositionId, targetPositionId);
      setTyreData((prev) => ({ ...prev, [vehicleId]: { layout, tyres } }));

      const movedTyre = tyres.find((t) => t.positionId === targetPositionId);
      const slot = TYRE_SLOTS.find((s) => s.positionId === targetPositionId);
      showToast(`Tyre ${movedTyre?.id ?? ""} moved to ${slot?.positionName ?? "new position"}`, "success", "Undo", () => undoLastChangeInternal());
    },
    [tyreData, showToast]
  );

  const undoLastChangeInternal = useCallback(() => {
    setUndoSnapshot((snap) => {
      if (!snap) return snap;
      setTyreData((prev) => ({ ...prev, [snap.vehicleId]: { layout: snap.layout, tyres: snap.tyres } }));
      showToast("Tyre position updated", "info");
      return null;
    });
  }, [showToast]);

  const undoLastChange = useCallback(() => {
    undoLastChangeInternal();
  }, [undoLastChangeInternal]);

  const confirmSwap = useCallback(() => {
    if (!swapRequest) return;
    const { vehicleId, sourcePositionId, targetPositionId } = swapRequest;
    const entry = tyreData[vehicleId];
    if (!entry) return;

    setUndoSnapshot({ vehicleId, layout: entry.layout, tyres: entry.tyres });
    const { layout, tyres } = applyPositionSwap(entry.layout, entry.tyres, sourcePositionId, targetPositionId);
    setTyreData((prev) => ({ ...prev, [vehicleId]: { layout, tyres } }));
    setSwapRequest(null);
    showToast("Tyres swapped successfully", "success", "Undo", () => undoLastChangeInternal());
  }, [swapRequest, tyreData, showToast, undoLastChangeInternal]);

  const cancelSwap = useCallback(() => setSwapRequest(null), []);

  // ---- Rotation mode ----

  const enterRotationMode = useCallback(() => {
    if (!selectedVehicle) return;
    const layout = getLayoutForVehicle(selectedVehicle.id);
    setPreRotationLayout(layout);
    setRotationDraftLayout({ ...layout });
    setRotationMode(true);
  }, [selectedVehicle, getLayoutForVehicle]);

  const cancelRotationMode = useCallback(() => {
    setRotationMode(false);
    setRotationDraftLayout(null);
    setPreRotationLayout(null);
  }, []);

  const saveRotationMode = useCallback(() => {
    if (!selectedVehicle || !rotationDraftLayout) return;
    const entry = tyreData[selectedVehicle.id];
    if (!entry) return;

    // Recompute tyre position fields from the draft layout
    const newTyres = entry.tyres.map((t) => {
      const positionId = Object.entries(rotationDraftLayout).find(([, tyreId]) => tyreId === t.id)?.[0];
      if (!positionId) return t;
      const slot = TYRE_SLOTS.find((s) => s.positionId === positionId);
      if (!slot) return t;
      return { ...t, positionId: slot.positionId, positionName: slot.positionName, axle: slot.axle, side: slot.side, type: slot.type };
    });

    setTyreData((prev) => ({ ...prev, [selectedVehicle.id]: { layout: rotationDraftLayout, tyres: newTyres } }));
    setRotationMode(false);
    setRotationDraftLayout(null);
    setPreRotationLayout(null);
    showToast("Tyre rotation saved", "success");
  }, [selectedVehicle, rotationDraftLayout, tyreData, showToast]);

  const rotationMoveTyre = useCallback(
    (sourcePositionId: string, targetPositionId: string) => {
      if (!rotationDraftLayout || sourcePositionId === targetPositionId) return;
      const draft = { ...rotationDraftLayout };
      const tyreAtSource = draft[sourcePositionId] ?? null;
      const tyreAtTarget = draft[targetPositionId] ?? null;

      if (tyreAtSource) draft[targetPositionId] = tyreAtSource; else delete draft[targetPositionId];
      if (tyreAtTarget) draft[sourcePositionId] = tyreAtTarget; else delete draft[sourcePositionId];

      setRotationDraftLayout(draft);
    },
    [rotationDraftLayout]
  );

  // ---- Issue reporting ----

  const reportIssue = useCallback(
    (vehicleId: string, description: string) => {
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicleId ? { ...v, health: "Needs Inspection" as HealthStatus } : v))
      );
      showToast(`Vehicle requires inspection — ${description}`, "warning");
    },
    [showToast]
  );

  const value: AppStateValue = {
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    selectedVehicle,

    tyreData,
    getTyresForVehicle,
    getLayoutForVehicle,

    selectedTyreId,
    isTyreDrawerOpen,
    openTyreDrawer,
    closeTyreDrawer,
    updateTyre,

    isMyVehiclesDrawerOpen,
    openMyVehiclesDrawer,
    closeMyVehiclesDrawer,

    isAddVehicleDrawerOpen,
    openAddVehicleDrawer,
    closeAddVehicleDrawer,
    addVehicle,

    swapRequest,
    requestMove,
    confirmSwap,
    cancelSwap,

    undoAvailable: Boolean(undoSnapshot),
    undoLastChange,

    rotationMode,
    rotationDraftLayout,
    enterRotationMode,
    cancelRotationMode,
    saveRotationMode,
    rotationMoveTyre,

    highlightedAxle,
    setHighlightedAxle,

    role,
    setRole,

    reportIssue,

    toasts,
    showToast,
    dismissToast,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
