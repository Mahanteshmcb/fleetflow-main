export type TyreCondition = "Healthy" | "Warning" | "Critical";
export type TyreType = "Steer" | "Drive" | "Trailer";
export type TyreSide = "left" | "right";

export type TyreServiceEvent = {
  date: string;
  label: string;
  odometer: number;
};

export type Tyre = {
  id: string;
  positionId: string;
  positionName: string;
  axle: number;
  side: TyreSide;
  type: TyreType;
  brand: string;
  model: string;
  size: string;
  pressure: number;
  treadDepth: number;
  temperature: number;
  odometer: number;
  wearPercentage: number;
  installationDate: string;
  lastServiceDate: string;
  nextInspectionDate: string;
  serviceCount: number;
  totalKilometres: number;
  condition: TyreCondition;
  issue: string | null;
  history: TyreServiceEvent[];
};

export type TyreSlot = {
  positionId: string;
  positionName: string;
  axle: number;
  side: TyreSide;
  type: TyreType;
  x: number;
  y: number;
};

export type TyreLayout = Record<string, string>; // positionId -> tyreId
