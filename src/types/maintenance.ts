export type MaintenanceStatus = "Upcoming" | "Overdue" | "Critical" | "Completed";

export type MaintenanceRecord = {
  id: string;
  task: string;
  vehicleId: string;
  vehicleRegistration: string;
  dueLabel: string;
  status: MaintenanceStatus;
  intervalType: "Kilometer-based" | "Time-based" | "Usage-based";
  schedule: string;
};

export type MaintenanceHistoryRecord = {
  id: string;
  type: string;
  date: string;
  odometer: number;
  partsCost: number;
  labourCost: number;
  totalCost: number;
  serviceCentre: string;
  mechanic: string;
  invoice: string;
  notes: string;
  nextServiceOdometer: number;
};
