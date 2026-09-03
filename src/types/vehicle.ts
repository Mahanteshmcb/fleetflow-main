export type HealthStatus = "Healthy" | "Warning" | "Critical" | "Needs Inspection";

export type ComplianceItem = {
  label: string;
  status: "Valid" | "Expiring Soon" | "Expired";
  expiryDate: string;
  daysRemaining: number;
};

export type Vehicle = {
  id: string;
  registration: string;
  manufacturer: string;
  model: string;
  vehicleType: string;
  capacity: string;
  manufacturingYear: string;
  chassisNumber: string;
  engineNumber: string;
  fuelType: string;
  odometer: number;
  purchaseDate: string;
  health: HealthStatus;
  nextMaintenance: {
    task: string;
    due: string;
    isOverdue: boolean;
  };
  monthlyCost: number;
  compliance: ComplianceItem[];
  gpsDeviceId?: string;
  gpsProvider?: string;
};
