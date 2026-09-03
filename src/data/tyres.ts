import { Tyre, TyreCondition, TyreLayout } from "../types/tyre";
import { TYRE_SLOTS } from "./tyreSlots";

const BRANDS: { brand: string; model: string }[] = [
  { brand: "Michelin", model: "X Multi" },
  { brand: "Bridgestone", model: "R150" },
  { brand: "Apollo", model: "EnduRace" },
  { brand: "MRF", model: "Superlug" },
  { brand: "CEAT", model: "Marathon" },
  { brand: "JK Tyre", model: "Radial XD" },
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function conditionFromWear(wear: number): TyreCondition {
  if (wear >= 78) return "Critical";
  if (wear >= 55) return "Warning";
  return "Healthy";
}

// Deterministic mock generator so each vehicle gets a believable, varied
// but stable set of 16 tyres. Tyre IDENTITY (id) is completely independent
// from POSITION (positionId) — positions are assigned only through the layout map.
export function generateTyreSet(vehicleSeed: number): { tyres: Tyre[]; layout: TyreLayout } {
  const tyres: Tyre[] = [];
  const layout: TyreLayout = {};

  TYRE_SLOTS.forEach((slot, i) => {
    const id = `T${String(i + 1).padStart(2, "0")}`;
    const seed = vehicleSeed * 7 + i * 3;
    const wear = 15 + ((seed * 13) % 82);
    const condition = conditionFromWear(wear);
    const { brand, model } = pick(BRANDS, seed);
    const pressure = condition === "Critical" ? 78 + (seed % 20) : 95 + (seed % 25);
    const tread = Math.max(1.5, 12 - wear / 10 - (seed % 3) * 0.4);
    const km = 40000 + ((seed * 977) % 90000);

    tyres.push({
      id,
      positionId: slot.positionId,
      positionName: slot.positionName,
      axle: slot.axle,
      side: slot.side,
      type: slot.type,
      brand,
      model,
      size: slot.type === "Steer" ? "295/80 R22.5" : "12R22.5",
      pressure,
      treadDepth: Number(tread.toFixed(1)),
      temperature: 34 + (seed % 20),
      odometer: km,
      wearPercentage: wear,
      installationDate: "2025-01-15",
      lastServiceDate: "2026-06-10",
      nextInspectionDate: "2026-09-20",
      serviceCount: 2 + (seed % 5),
      totalKilometres: km,
      condition,
      issue: condition === "Critical" ? "Uneven wear detected" : condition === "Warning" ? "Pressure slightly low" : null,
      history: [
        { date: "2026-08-20", label: "Tyre Rotation", odometer: km },
        { date: "2026-06-10", label: "Pressure Check", odometer: Math.max(0, km - 7200) },
        { date: "2025-01-15", label: "Tyre Installed", odometer: 0 },
      ],
    });

    layout[slot.positionId] = id;
  });

  return { tyres, layout };
}
